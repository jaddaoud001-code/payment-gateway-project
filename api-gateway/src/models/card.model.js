const cards = [
  { id: "1", userId: "u1", balance: 100, status: "active" },
];

const getCardById = (id) => {
  return cards.find((c) => c.id === id);
};

const updateCardBalance = (id, newBalance) => {
  const card = cards.find((c) => c.id === id);
  if (card) {
    card.balance = newBalance;
  }
};

module.exports = {
  getCardById,
  updateCardBalance,
};