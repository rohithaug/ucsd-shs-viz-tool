// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONTROLLERS
const { adminController } = require("../../controllers");

// CREATE ADMIN
router.post("/create", adminController.createAdmin);

// VALIDATE ADMIN
router.post("/validate", adminController.validateAdmin);

// GET ADMIN NAME
router.get("/name/:adminId", adminController.getAdminName);

// SIGN IN ADMIN
router.post("/signin", adminController.signInAdmin);

module.exports = router;