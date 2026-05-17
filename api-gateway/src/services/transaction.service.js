const { getCardById, updateCardBalance } = require("../models/card.model");
const { createTransaction } = require("../models/transaction.model");

const processTransaction = ({ cardId, amount, stationId }) => {
  // 1. Validate input
  if (!cardId || !amount || !stationId) {
    throw new Error("Missing required fields");
  }

  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  // 2. Get card
  const card = getCardById(cardId);
  if (!card) {
    throw new Error("Card not found");
  }

  if (card.status !== "active") {
    throw new Error("Card is not active");
  }

  // 3. Check balance
  if (card.balance < amount) {
    throw new Error("Insufficient balance");
  }

  // 4. Deduct balance
  const newBalance = card.balance - amount;
  updateCardBalance(cardId, newBalance);

  // 5. Create transaction
  const transaction = {
    id: Date.now().toString(),
    cardId,
    amount,
    stationId,
    timestamp: new Date(),
  };

  return createTransaction(transaction);
};

module.exports = {
  processTransaction,
};