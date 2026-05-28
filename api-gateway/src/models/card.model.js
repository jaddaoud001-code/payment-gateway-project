const pool = require("../config/db");

const getCardById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM cards WHERE id = $1",
    [id]
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

const updateCardBalance = async (
  client,
  id,
  newBalance
) => {
  await client.query(
    "UPDATE cards SET balance = $1 WHERE id = $2",
    [newBalance, id]
  );
};

module.exports = {
  getCardById,
  getCardByUserId,
  updateCardBalance,
};