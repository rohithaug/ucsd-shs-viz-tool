// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONTROLLERS
const { analyticsController } = require("../../controllers");

// POST REQUEST FOR ANALYTICS DATA
router.post("/metrics", analyticsController.getMetrics);

module.exports = router;