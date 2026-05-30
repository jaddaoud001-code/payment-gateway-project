const express = require("express");
const roleMiddleware = require("../middleware/role.middleware");

const {
  createTransactionController,
  getTransactionsController,
} = require("../controllers/transaction.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

const validate = require("../middleware/validation.middleware");

const {
  transactionSchema,
} = require("../validators/transaction.validator");

router.post(
  "/transactions",
  authMiddleware,
  roleMiddleware("station", "admin"),
  validate(transactionSchema),
  createTransactionController
);

router.get(
  "/transactions",
  authMiddleware,
  getTransactionsController
);

module.exports = router;