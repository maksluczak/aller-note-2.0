const express = require('express');
const authRoutes = require("../controllers/Auth");
const router = express.Router();

router.post("/register", authRoutes.handleRegister);
router.post("/login", authRoutes.handleLogin);
router.get("/logout", authRoutes.handleLogout);
router.get("/refresh", authRoutes.refreshToken);

module.exports = router;