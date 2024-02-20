// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE SERVICES
const { trackerService } = require('../services');

// REQUIRE UTILS
const catchAsync = require('../utils/catchAsync');

/**
 * Creates a new tracker entry based on the request body.
 *
 * @function
 * @async
 * @name trackVisit
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the tracker entry is created and the response is sent.
 * @throws {Error} If there is an issue creating the tracker entry or sending the response.
 */
const trackVisit = catchAsync(async (req, res) => {
    const event = await trackerService.trackBlogVisit(req.body);  
    res.status(httpStatus.CREATED).send(event);
});

module.exports = {
    trackVisit
};