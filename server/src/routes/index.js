const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const locationRoutes = require("./locationRoutes");
const pollenRoutes = require("./pollenRoutes");
const authRoutes = require("./authRoutes");

const express = require("express");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/note", noteRoutes);
router.use("/location", locationRoutes);
router.use("/pollen", pollenRoutes);

module.exports = router;