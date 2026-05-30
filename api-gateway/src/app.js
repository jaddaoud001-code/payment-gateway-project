const express = require("express");

const app = express();

const errorMiddleware = require("./middleware/error.middleware");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Routes
const transactionRoutes = require("./routes/transaction.routes");
app.use("/api", transactionRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const cardRoutes =
  require("./routes/card.routes");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

app.use("/cards", cardRoutes);

app.use(errorMiddleware);