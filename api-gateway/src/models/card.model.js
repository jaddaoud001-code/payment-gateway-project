const pool = require("../config/db");

const getCardById = async (cardId) => {
  const result = await pool.query(
    "SELECT * FROM cards WHERE id = $1",
    [cardId]
  );

  return result.rows[0];
};

const getCardByUserId = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM cards WHERE user_id = $1",
    [userId]
  );

  return result.rows[0];
};

const createCard = async (
  userId,
  initialBalance = 0
) => {
  const result = await pool.query(
    `
    INSERT INTO cards (user_id, balance, status)
    VALUES ($1, $2, 'active')
    RETURNING *
    `,
    [userId, initialBalance]
  );

  return result.rows[0];
};

const updateCardBalance = async (
  client,
  cardId,
  newBalance
) => {
  await client.query(
    `
    UPDATE cards
    SET balance = $1
    WHERE id = $2
    `,
    [newBalance, cardId]
  );
};

const rechargeCard = async (
  cardId,
  amount
) => {
  const result = await pool.query(
    `
    UPDATE cards
    SET balance = balance + $1
    WHERE id = $2
    RETURNING *
    `,
    [amount, cardId]
  );

  return result.rows[0];
};

const updateCardStatus = async (
  cardId,
  status
) => {
  const result = await pool.query(
    `
    UPDATE cards
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
    [status, cardId]
  );

  return result.rows[0];
};

module.exports = {
  getCardById,
  getCardByUserId,
  createCard,
  updateCardBalance,
  rechargeCard,
  updateCardStatus,
};