const express = require("express");

const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

const router = express.Router();

const validate = require("../middleware/validation.middleware");

const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

router.post(
  "/register",
  validate(registerSchema),
  registerController
);

router.post(
  "/login",
  validate(loginSchema),
  loginController
);

module.exports = router;