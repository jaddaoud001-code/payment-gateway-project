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

const processTransaction = async ({
  userId,
  amount,
  stationId,
}) => {
  if (!amount || !stationId) {
    throw new Error("Missing required fields");
  }

  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

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

  const newBalance = Number(card.balance) - amount;

  await updateCardBalance(card.id, newBalance);

  return await createTransaction({
    cardId: card.id,
    amount,
    stationId,
  });
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