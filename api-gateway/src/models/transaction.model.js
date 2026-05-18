const pool = require("../config/db");

const createTransaction = async ({
  cardId,
  amount,
  stationId,
}) => {
  const result = await pool.query(
    `
    INSERT INTO transactions (card_id, amount, station_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [cardId, amount, stationId]
  );

  return result.rows[0];
};

const getTransactions = async () => {
  const result = await pool.query(
    "SELECT * FROM transactions ORDER BY created_at DESC"
  );

  return result.rows;
};

module.exports = {
  createTransaction,
  getTransactions,
};