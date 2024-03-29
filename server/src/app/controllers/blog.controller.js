// REQUIRE PACKAGES
const fs = require('fs');
const path = require('path');
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
        res.status(httpStatus.NOT_FOUND).send({
            message: 'Blog not found',
            description: 'The requested page does not exist.'           
        });
    } else {
        res.status(httpStatus.OK).send(blog);
    }
});

/**
 * Get blog image for the given ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with blog image.
 * @throws {Error} If there is an issue getting blog image or sending the response.
 */
const getBlogImage = catchAsync(async (req, res) => {
    const imageFileName = req.query.fileName;
    const filepath = path.join(__dirname, '..', '..', 'assets', 'images', 'blog', imageFileName);

    fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(httpStatus.NOT_FOUND).send('Blog image not found');
        }

        res.sendFile(filepath);
    });
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
 * Likes an existing blog details based on the request parameters and body.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the blog is updated and the response is sent.
 * @throws {Error} If there is an issue liking the blog or sending the response.
 */
const likeBlog = catchAsync(async (req, res) => {
    await blogService.likeBlog(req.params.blogId);  
    res.send("");
});

/**
 * Dislikes an existing blog details based on the request parameters and body.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the blog is updated and the response is sent.
 * @throws {Error} If there is an issue disliking the blog or sending the response.
 */
const dislikeBlog = catchAsync(async (req, res) => {
    await blogService.dislikeBlog(req.params.blogId);  
    res.send("");
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

/**
 * Get details of all blogs.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with blog details.
 * @throws {Error} If there is an issue getting blog details or sending the response.
 */
const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getAllBlogs();
    if (!blogs) {
        res.status(httpStatus.BAD_REQUEST).send({
            message: 'Blog details not found',
            description: 'Unexpected server error in getting posts in bulk. If the issue persists contact the system administrator'           
        });
    } else {
        res.status(httpStatus.OK).send(blogs);
    }
});

module.exports = {
    createBlog,
    getBlog,
    getBlogImage,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    likeBlog,
    dislikeBlog
};