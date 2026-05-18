const express = require("express");

const {
  createTransactionController,
  getTransactionsController,
} = require("../controllers/transaction.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/transactions",
  authMiddleware,
  createTransactionController
);

router.get(
  "/transactions",
  authMiddleware,
  getTransactionsController
);

module.exports = router;