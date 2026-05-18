const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserByUsername,
} = require("../models/user.model");

const registerUser = async ({
  username,
  password,
}) => {
  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUser({
    username,
    password: hashedPassword,
    role: "user",
  });
};

const loginUser = async ({
  username,
  password,
}) => {
  const user = await getUserByUsername(username);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    "SECRET_KEY",
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};