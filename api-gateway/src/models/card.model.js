const pool = require("../config/db");

const getCardById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM cards WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const updateCardBalance = async (id, newBalance) => {
  await pool.query(
    "UPDATE cards SET balance = $1 WHERE id = $2",
    [newBalance, id]
  );
};

module.exports = {
  getCardById,
  updateCardBalance,
};