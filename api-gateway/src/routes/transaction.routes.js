const express = require("express");
const { createTransactionController } = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/transactions", createTransactionController);

module.exports = router;