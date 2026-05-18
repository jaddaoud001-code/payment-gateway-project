const express = require("express");

const {
  createTransactionController,
  getTransactionsController,
} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/transactions", createTransactionController);

router.get("/transactions", getTransactionsController);

module.exports = router;