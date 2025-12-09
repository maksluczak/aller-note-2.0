const express = require('express');
const userController = require('../controllers/User');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();
router.use(verifyJWT);

router.get("/me/location/:id", userController.getUserLocation);
router.get("/:id", userController.getUserById);
router.post("/:id", userController.handlePollenDataForUser);
router.put("/username/:id", userController.updateUsername);
router.put("/password/:id", userController.updatePassword);

module.exports = router;