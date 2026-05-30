const {
  getCardById,
  getCardByUserId,
  updateCardBalance,
} = require("../models/card.model");

const {
  createTransaction,
  getTransactions,
  getTransactionsByCardId,
} = require("../models/transaction.model");

const pool = require("../config/db");

const processTransaction = async ({
  userId,
  amount,
  stationId,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const card = await getCardByUserId(userId);

    if (!card) {
      throw new Error("Card not found");
    }

    if (card.status !== "active") {
      throw new Error("Card is not active");
    }

    if (Number(card.balance) < amount) {
      throw new Error("Insufficient balance");
    }

    const newBalance =
      Number(card.balance) - amount;

    await updateCardBalance(
      client,
      card.id,
      newBalance
    );

    const transaction =
      await createTransaction(client, {
        cardId: card.id,
        amount,
        stationId,
      });

    await client.query("COMMIT");

    return transaction;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

const fetchTransactions = async (user) => {
  // Admin can see all transactions
  if (user.role === "admin") {
    return await getTransactions();
  }

  // Normal users only see their own transactions
  const card = await getCardByUserId(user.id);

  if (!card) {
    throw new Error("Card not found");
  }

  return await getTransactionsByCardId(card.id);
};

module.exports = {
  processTransaction,
  fetchTransactions,
};