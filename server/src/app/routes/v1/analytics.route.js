// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONTROLLERS
const { analyticsController } = require("../../controllers");

// GET REQUEST FOR ANALYTICS DATA
router.get("/metrics", analyticsController.getMetrics);

module.exports = router;