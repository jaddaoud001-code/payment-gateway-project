const transactions = [];

const createTransaction = (transaction) => {
  transactions.push(transaction);
  return transaction;
};

const getTransactions = () => {
  return transactions;
};

module.exports = {
  createTransaction,
  getTransactions,
};