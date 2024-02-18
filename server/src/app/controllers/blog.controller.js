// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE SERVICES
const { blogService } = require('../services');

// REQUIRE UTILS
const catchAsync = require('../utils/catchAsync');

/**
 * Creates a new blog based on the request body.
 *
 * @function
 * @async
 * @name createBlog
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the blog is created and the response is sent.
 * @throws {Error} If there is an issue creating the blog or sending the response.
 */
const createBlog = catchAsync(async (req, res) => {
    const blog = await blogService.createBlog(req.body);  
    res.status(httpStatus.CREATED).send(blog);
});

/**
 * Get blog details for the given blog ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with blog details.
 * @throws {Error} If there is an issue getting blog details or sending the response.
 */
const getBlog = catchAsync(async (req, res) => {
    const blog = await blogService.getBlog(req.params.blogId);
    if (!blog) {
        res.status(httpStatus.NOT_FOUND).send('Blog not found');
    } else {
        res.status(httpStatus.OK).send(blog);
    }
});

/**
 * Updates an existing blog details based on the request parameters and body.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the blog is updated and the response is sent.
 * @throws {Error} If there is an issue updating the blog or sending the response.
 */
const updateBlog = catchAsync(async (req, res) => {
    const blog = await blogService.updateBlog(req.params.blogId, req.body);  
    res.send(blog);
});
  
/**
 * Deletes an existing blog based on the request parameters.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the blog is deleted and the response is sent.
 * @throws {Error} If there is an issue deleting the blog or sending the response.
 */
const deleteBlog = catchAsync(async (req, res) => {
    await blogService.deleteBlog(req.params.blogId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
};