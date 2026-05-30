const {
  createCard,
  getCardById,
  rechargeCard,
  updateCardStatus,
} = require("../models/card.model");

const createNewCard = async (
  userId,
  initialBalance
) => {
  return await createCard(
    userId,
    initialBalance
  );
};

const getCardDetails = async (
  cardId
) => {
  const card = await getCardById(cardId);

  if (!card) {
    throw new Error("Card not found");
  }

  return card;
};

const rechargeExistingCard = async (
  cardId,
  amount
) => {
  if (amount <= 0) {
    throw new Error(
      "Amount must be positive"
    );
  }

  return await rechargeCard(
    cardId,
    amount
  );
};

const freezeCard = async (
  cardId
) => {
  return await updateCardStatus(
    cardId,
    "frozen"
  );
};

const activateCard = async (
  cardId
) => {
  return await updateCardStatus(
    cardId,
    "active"
  );
};

module.exports = {
  createNewCard,
  getCardDetails,
  rechargeExistingCard,
  freezeCard,
  activateCard,
};