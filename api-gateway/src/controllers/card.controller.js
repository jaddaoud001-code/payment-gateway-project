const {
  createNewCard,
  getCardDetails,
  rechargeExistingCard,
  freezeCard,
  activateCard,
} = require("../services/card.service");

const createCardController = async (
  req,
  res,
  next
) => {
  try {
    const card =
      await createNewCard(
        req.body.userId,
        req.body.initialBalance || 0
      );

    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};

const getCardController = async (
  req,
  res,
  next
) => {
  try {
    const card =
      await getCardDetails(
        req.params.id
      );

    res.json(card);
  } catch (error) {
    next(error);
  }
};

const rechargeCardController =
  async (req, res, next) => {
    try {
      const card =
        await rechargeExistingCard(
          req.params.id,
          req.body.amount
        );

      res.json(card);
    } catch (error) {
      next(error);
    }
  };

const freezeCardController =
  async (req, res, next) => {
    try {
      const card =
        await freezeCard(
          req.params.id
        );

      res.json(card);
    } catch (error) {
      next(error);
    }
  };

const activateCardController =
  async (req, res, next) => {
    try {
      const card =
        await activateCard(
          req.params.id
        );

      res.json(card);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createCardController,
  getCardController,
  rechargeCardController,
  freezeCardController,
  activateCardController,
};