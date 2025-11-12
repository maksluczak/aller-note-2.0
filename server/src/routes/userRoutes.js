const express = require('express');
const userController = require('../controllers/User');

const router = express.Router();

router.get("/me/location/:id", userController.getUserLocation);
router.get("/:id", userController.getUserById);
router.put("/username/:id", userController.updateUsername);
router.put("/password/:id", userController.updatePassword);

router.post("/register", userController.handleRegister);
router.post("/login", userController.handleLogin);
router.get("/logout", userController.handleLogout);
router.get("/refresh", userController.refreshToken);

module.exports = router;