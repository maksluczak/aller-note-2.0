const express = require("express");
const locationController = require("../controllers/Location");

const router = express.Router();

router.post("/", locationController.createLocation);
router.get("/:voivodeship", locationController.getLocationByVoivodeship);

module.exports = router;