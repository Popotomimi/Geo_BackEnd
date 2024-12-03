// controllers/authController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "seuSegredoSuperSecreto";

exports.register = async (req, res) => {
  const { username, password } = req.body;
  console.log("Dados recebidos:", { username, password });

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Senha criptografada:", hashedPassword);

  try {
    const newUser = new Admin({ username, password: hashedPassword });
    await newUser.save();
    console.log("Usuário salvo:", newUser);
    res.status(201).send("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send("Erro ao registrar usuário.");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });

  if (!user) {
    return res.status(401).send("Usuário não encontrado.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Senha incorreta.");
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
