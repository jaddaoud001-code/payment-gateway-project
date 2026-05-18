const {
  getCardById,
  updateCardBalance,
} = require("../models/card.model");

const {
  createTransaction,
  getTransactions,
} = require("../models/transaction.model");

const processTransaction = async ({
  cardId,
  amount,
  stationId,
}) => {
  if (!cardId || !amount || !stationId) {
    throw new Error("Missing required fields");
  }

  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  const card = await getCardById(cardId);

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

  await updateCardBalance(cardId, newBalance);

  return await createTransaction({
    cardId,
    amount,
    stationId,
  });
};

const fetchTransactions = async () => {
  return await getTransactions();
};

module.exports = {
  processTransaction,
  fetchTransactions,
};