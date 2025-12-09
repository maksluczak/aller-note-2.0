const express = require("express");
const pollenController = require("../controllers/Pollen");

const router = express.Router();

router.get("/:pollenLocationId", pollenController.getPollenDataFromExternalAPI);
router.post("/:id", pollenController.handlePollenDataForUser);

module.exports = router;