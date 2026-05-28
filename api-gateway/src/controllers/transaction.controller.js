const {
  processTransaction,
  fetchTransactions,
} = require("../services/transaction.service");

const createTransactionController = async (req, res) => {
  try {
    const transaction = await processTransaction({
      userId: req.user.id,
      amount: req.body.amount,
      stationId: req.body.stationId,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getTransactionsController = async (req, res) => {
  try {
    const transactions = await fetchTransactions(req.user);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTransactionController,
  getTransactionsController,
};