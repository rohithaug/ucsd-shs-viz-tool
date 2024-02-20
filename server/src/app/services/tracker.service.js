// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE MODELS
const { trackerModel } = require('../models');

// REQUIRE UTILS
const apiError = require('../utils/apiError');

/**
 * Tracks a new visit to a blog.
 *
 * @function
 * @async
 * @param {Object} eventBody - The data for creating a new tracking event.
 * @returns {Promise<user>} A promise that resolves to the created event.
 */
const trackBlogVisit = async (eventBody) => {
    if (!eventBody.blogId) {
        throw new apiError(httpStatus.BAD_REQUEST, 'Insufficient data to track blog visit');
    }

    const event = new trackerModel(eventBody);
    await event.save();

    return event;
};

module.exports = {
    trackBlogVisit
};
