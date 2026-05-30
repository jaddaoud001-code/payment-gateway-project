const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const roleMiddleware = require(
  "../middleware/role.middleware"
);

const {
  createCardController,
  getCardController,
  rechargeCardController,
  freezeCardController,
  activateCardController,
} = require(
  "../controllers/card.controller"
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createCardController
);

router.get(
  "/:id",
  authMiddleware,
  getCardController
);

router.put(
  "/:id/recharge",
  authMiddleware,
  roleMiddleware("admin"),
  rechargeCardController
);

router.put(
  "/:id/freeze",
  authMiddleware,
  roleMiddleware("admin"),
  freezeCardController
);

router.put(
  "/:id/activate",
  authMiddleware,
  roleMiddleware("admin"),
  activateCardController
);

module.exports = router;