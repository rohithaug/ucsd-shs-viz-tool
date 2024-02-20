// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONFIG
const { config } = require("../../../config");

// REQUIRE ROUTES
const blogRoutes = require("./blog.route");

module.exports = (app) => {
    // BASE URI
    app.get(`${config.api.basePath}`, (req, res) => {
        res.send("UCSD CSE 210 Project Server Backend API Base URL");
    })

    // BLOG ROUTES
    router.use('/blog', blogRoutes);

    // REGISTER API ROUTES
    app.use(`${config.api.basePath}`, router);
};