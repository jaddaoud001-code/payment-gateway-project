const {
  processTransaction,
  fetchTransactions,
} = require("../services/transaction.service");

const createTransactionController = async (
  req,
  res,
  next
) => {
  try {
    const transaction =
      await processTransaction({
        userId: req.user.id,
        amount: req.body.amount,
        stationId: req.body.stationId,
      });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getTransactionsController = async (
  req,
  res,
  next
) => {
  try {
    const transactions =
      await fetchTransactions(req.user);

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransactionController,
  getTransactionsController,
};