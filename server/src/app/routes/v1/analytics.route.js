// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONTROLLERS
const { analyticsController } = require("../../controllers");

// GET REQUEST FOR ANALYTICS DATA
router.get("/metrics", analyticsController.getMetrics);

// GET REQUEST FOR ANALYTICS DATA FOR BULK BLOGS
router.get("/metrics/bulk", analyticsController.getBulkMetrics);

// GET REQUEST FOR ANALYTICS DATA FOR A SPECIFIC BLOG
router.get("/metrics/:blogId", analyticsController.getBlogMetrics);

module.exports = router;