const express = require('express');
const userController = require('../controllers/User');
const verifyJWT = require('../middlewares/verifyJWT');
const requireSelf = require('../middlewares/requireSelf');

const router = express.Router();
router.use(verifyJWT);

router.get("/me/location/:id", requireSelf, userController.getUserLocation);
router.put("/me/location/:id", requireSelf, userController.updateLocation);
router.get("/:id", requireSelf, userController.getUserById);
router.post("/:id", requireSelf, userController.handlePollenDataForUser);
router.put("/username/:id", requireSelf, userController.updateUsername);
router.put("/password/:id", requireSelf, userController.updatePassword);

module.exports = router;