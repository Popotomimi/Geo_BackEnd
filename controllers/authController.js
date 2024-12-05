// controllers/authController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helpers
const createUserToken = require("../helpers/create-user-token");

exports.register = async (req, res) => {
  const { adminname, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new Admin({
      adminname,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send("Erro ao registrar usuário.");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validações
  if (!username) {
    res.status(422).json({ message: "O Usuário é obrigatório!" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "A senha é obrigatória!" });
    return;
  }

  // Verificando se o usuário já esta cadastrado no banco de dados
  const user = await Admin.findOne({ username: username });

  if (!user) {
    res.status(422).json({
      message: "Não existe usuário cadastrado com essas informações!",
    });
    return;
  }

  // Verificando se a senha é a mesma cadastrada no DB
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    res.status(422).json({
      message: "Senha inválida",
    });
    return;
  }

  await createUserToken(user, req, res);
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
