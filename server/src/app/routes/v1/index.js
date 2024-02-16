// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONFIG
const { config } = require("../../../config");

// REQUIRE ROUTES

module.exports = (app) => {
    // BASE URI
    app.get(`${config.api.basePath}`, (req, res) => {
        res.send("UCSD CSE 210 Project Server Backend API Base URL");
    })

    // REGISTER API ROUTES
    app.use(`${config.api.basePath}`, router);
};