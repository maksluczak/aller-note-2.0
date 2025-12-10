const express = require("express");
const pollenController = require("../controllers/Pollen");

const router = express.Router();

router.get("/:voivodeship", pollenController.getPollenDataFromExternalAPI);

module.exports = router;