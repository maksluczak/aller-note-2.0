const express = require('express');
const authRoutes = require("../controllers/Auth");
const router = express.Router();
const {authLimiter, refreshLimiter} = require("../middlewares/rateLimiter");

router.post("/register", authLimiter, authRoutes.handleRegister);
router.post("/login", authLimiter, authRoutes.handleLogin);
router.get("/logout", authRoutes.handleLogout);
router.get("/refresh", refreshLimiter, authRoutes.refreshToken);

module.exports = router;