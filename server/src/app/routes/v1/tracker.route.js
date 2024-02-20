// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONTROLLERS
const { trackerController } = require("../../controllers");

// CREATE REQUEST FOR BLOG
router.post("/visit", trackerController.trackVisit);


module.exports = router;