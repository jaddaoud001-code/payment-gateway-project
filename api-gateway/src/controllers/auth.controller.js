const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

const registerController = async (
  req,
  res,
  next
) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginController = async (
  req,
  res,
  next
) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};