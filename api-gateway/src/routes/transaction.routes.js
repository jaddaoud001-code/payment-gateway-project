const express = require("express");
const roleMiddleware = require("../middleware/role.middleware");

const {
  createTransactionController,
  getTransactionsController,
} = require("../controllers/transaction.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/transactions",
  authMiddleware,
  roleMiddleware("station", "admin"),
  createTransactionController
);

router.get(
  "/transactions",
  authMiddleware,
  getTransactionsController
);

module.exports = router;