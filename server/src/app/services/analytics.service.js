// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE MODELS
const { trackerModel } = require('../models');

// REQUIRE SERVICES
const { getAllBlogsIdAndCategory } = require('./blog.service');

// REQUIRE UTILS
const apiError = require('../utils/apiError');

/**
 * Get SHS Dashboard Analytics Metrics.
 * 
 * @function
 * @async
 * @returns {Promise<user>} - Promise that resolved to the retrieved metrics.
 */
const getMetrics = async () => {
    const data = await trackerModel.find();

    const metrics = {
        uniqueVisit: {
            blog: {}, // UNIQUE VISITS TO EACH BLOG PAGE
            category: {}, // UNIQUE VISITS TO EACH CATEGORY    
        },
        source: {
            consolidated: {}, // CONSOLIDATED SOURCE OF VISITS
            blog: {} // SOURCE OF VISITS FOR EACH BLOG PAGE
        }
    }

    data.forEach(element => {
        const blogId = element.blogId;

        // UNIQUE VISITS TO EACH BLOG PAGE
        if (blogId in metrics.uniqueVisit.blog) {
            metrics.uniqueVisit.blog[blogId] += 1
        } else {
            metrics.uniqueVisit.blog[blogId] = 1
        }

        const blogSource = element.source;
        // CONSOLIDATED SOURCE OF VISITS
        if (blogSource in metrics.source.consolidated) {
            metrics.source.consolidated[blogSource] += 1
        } else {
            metrics.source.consolidated[blogSource] = 1
        }
        // SOURCE OF VISITS FOR EACH BLOG PAGE
        if (blogId in metrics.source.blog) {
            if (blogSource in metrics.source.blog[blogId]) {
                metrics.source.blog[blogId][blogSource] += 1
            } else {
                metrics.source.blog[blogId][blogSource] = 1
            }
        } else {
            metrics.source.blog[blogId] = {
                [blogSource]: 1
            }
        }
    });

    const blogDetails = await getAllBlogsIdAndCategory();
    blogDetails.forEach(({ blogId, category }) => {
        // CHECK IF BLOG IS IN COUNT
        if (!(blogId in metrics.uniqueVisit.blog)) {
            metrics.uniqueVisit.blog[blogId] = 0
        }

        // UNIQUE VISITS TO EACH CATEGORY
        if (category in metrics.uniqueVisit.category) {
            metrics.uniqueVisit.category[category] += metrics.uniqueVisit.blog[blogId]
        } else {
            metrics.uniqueVisit.category[category] = metrics.uniqueVisit.blog[blogId]
        }
    })

    // Convert metrics to array
    metrics.uniqueVisit.blog = Object.entries(metrics.uniqueVisit.blog).map(([blogId, count]) => ({ blogId, count }));
    metrics.uniqueVisit.category = Object.entries(metrics.uniqueVisit.category).map(([blogId, count]) => ({ blogId, count }));
    metrics.source.blog = Object.entries(metrics.source.blog).map(([blogId, count]) => ({ blogId, count }));

    return metrics;
};

module.exports = {
    getMetrics
};
