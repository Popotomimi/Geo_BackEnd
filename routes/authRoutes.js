// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Middleware
const verifyToken = require("../helpers/verify-token");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
