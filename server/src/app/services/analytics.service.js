// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE MODELS
const { trackerModel } = require('../models');

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
        uniqueVisit: {}, // UNIQUE VISIT TO EACH BLOG PAGE
        blogSource: {} // SOURCE OF VISIT FOR EACH BLOG PAGE
    }

    data.forEach(element => {
        const blogId = element.blogId;

        // UNIQUE VISIT TO EACH BLOG PAGE
        if (blogId in metrics.uniqueVisit) {
            metrics.uniqueVisit[blogId] += 1
        } else {
            metrics.uniqueVisit[blogId] = 1
        }

        // SOURCE OF VISIT FOR EACH BLOG PAGE
        const blogSource = element.source;
        if (blogId in metrics.blogSource) {
            if (blogSource in metrics.blogSource[blogId]) {
                metrics.blogSource[blogId][blogSource] += 1
            } else {
                metrics.blogSource[blogId][blogSource] = 1
            }
        } else {
            metrics.blogSource[blogId] = {
                [blogSource]: 1
            }
        }
    });

    // Convert metrics to array
    metrics.uniqueVisit = Object.entries(metrics.uniqueVisit).map(([blogId, count]) => ({ blogId, count }));
    metrics.blogSource = Object.entries(metrics.blogSource).map(([blogId, count]) => ({ blogId, count }));

    return metrics;
};

module.exports = {
    getMetrics
};
