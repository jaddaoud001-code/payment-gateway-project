const { getCardById, updateCardBalance } = require("../models/card.model");

const {
  createTransaction,
  getTransactions,
} = require("../models/transaction.model");

const processTransaction = ({ cardId, amount, stationId }) => {
  // Validate input
  if (!cardId || !amount || !stationId) {
    throw new Error("Missing required fields");
  }

  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  // Get card
  const card = getCardById(cardId);

  if (!card) {
    throw new Error("Card not found");
  }

  if (card.status !== "active") {
    throw new Error("Card is not active");
  }

  // Check balance
  if (card.balance < amount) {
    throw new Error("Insufficient balance");
  }

  // Deduct balance
  const newBalance = card.balance - amount;

  updateCardBalance(cardId, newBalance);

  // Create transaction
  const transaction = {
    id: Date.now().toString(),
    cardId,
    amount,
    stationId,
    timestamp: new Date(),
  };

  return createTransaction(transaction);
};

const fetchTransactions = () => {
  return getTransactions();
};

module.exports = {
  processTransaction,
  fetchTransactions,
};