const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Routes
const transactionRoutes = require("./routes/transaction.routes");
app.use("/api", transactionRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;