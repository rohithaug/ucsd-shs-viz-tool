// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE SERVICES
const { analyticsService } = require('../services');

// REQUIRE UTILS
const catchAsync = require('../utils/catchAsync');
const isAuth = require('../utils/isAuth');

/**
 * Get SHS Dashboard Analytics Metrics.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with metric details.
 * @throws {Error} If there is an issue getting metric details or sending the response.
 */
const getMetrics = async (req, res) => {
    try {
        isAuth(req, res, async () => {
            const metrics = await analyticsService.getMetrics();
            if (!metrics) {
                res.status(httpStatus.BAD_REQUEST).send({
                    message: 'Error fetching dashboard metrics',
                    description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
                });
            } else {
                res.status(httpStatus.OK).send(metrics);
            }
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            message: 'Error fetching dashboard metrics',
            description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
        });
    }
};

/**
 * Get SHS Dashboard Analytics Metrics for a specific blog.
 * 
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with metric details for a specific blog.
 * @throws {Error} If there is an issue getting metric details or sending the response.
 */

const getBlogMetrics = async (req, res) => {
    try {
        isAuth(req, res, async () => {
            const { blogId } = req.params;
            const metrics = await analyticsService.getBlogMetrics(blogId);
            if (!metrics) {
                res.status(httpStatus.BAD_REQUEST).send({
                    message: 'Error fetching dashboard metrics',
                    description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
                });
            } else {
                res.status(httpStatus.OK).send(metrics);
            }
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            message: 'Error fetching dashboard metrics',
            description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
        });
    }
};

/**
 * Get SHS Dashboard Analytics Metrics for bulk blogs.
 * 
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with metric details for bulk blogs.
 * @throws {Error} If there is an issue getting metric details or sending the response.
 */

const getBulkMetrics = async (req, res) => {
    try {
        isAuth(req, res, async () => {
            const metrics = await analyticsService.getBulkMetrics();
            if (!metrics) {
                res.status(httpStatus.BAD_REQUEST).send({
                    message: 'Error fetching dashboard metrics',
                    description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
                });
            } else {
                res.status(httpStatus.OK).send(metrics);
            }
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            message: 'Error fetching dashboard metrics',
            description: 'Unexpected server error in getting metrics for dashboard. If the issue persists contact the system administrator'           
        });
    }
}

module.exports = {
    getMetrics,
    getBlogMetrics,
    getBulkMetrics
};