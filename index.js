require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3333;
const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const authController = require("./controllers/authController");

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);

app.get("/admin", authController.verifyToken, (req, res) => {
  res.send("Bem-vindo à página de admin!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
