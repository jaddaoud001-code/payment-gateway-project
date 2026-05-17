const { processTransaction } = require("../services/transaction.service");

const createTransactionController = (req, res) => {
  try {
    const transaction = processTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransactionController,
};