const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

const registerController = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};