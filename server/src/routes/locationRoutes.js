const express = require("express");
const locationController = require("../controllers/Location");
const requireAdminKey = require("../middlewares/requireAdminKey");

const router = express.Router();

router.post("/", requireAdminKey, locationController.createLocation);
router.get("/:voivodeship", locationController.getLocationByVoivodeship);

module.exports = router;