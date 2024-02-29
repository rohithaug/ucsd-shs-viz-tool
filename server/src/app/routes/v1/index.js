// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONFIG
const { config } = require("../../../config");

// REQUIRE ROUTES
const analyticsRoutes = require("./analytics.route");
const blogRoutes = require("./blog.route");
const trackerRoutes = require("./tracker.route");
const adminRoutes = require("./admin.route");

module.exports = (app) => {
    // BASE URI
    app.get(`${config.api.basePath}`, (req, res) => {
        res.send("UCSD CSE 210 Project Server Backend API Base URL");
    })

    // BLOG ROUTES
    router.use('/blog', blogRoutes);

    // TRACKER ROUTES
    router.use('/track', trackerRoutes);

    // ANALYTICS ROUTES
    router.use('/analytics', analyticsRoutes);

    // ADMIN ROUTES
    router.use('/admin', adminRoutes);

    // REGISTER API ROUTES
    app.use(`${config.api.basePath}`, router);
};