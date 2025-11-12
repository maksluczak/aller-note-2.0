const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const locationRoutes = require("./locationRoutes");

const express = require("express");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/note", noteRoutes);
router.use("/location", locationRoutes);

module.exports = router;