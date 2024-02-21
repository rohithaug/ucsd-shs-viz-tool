// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE MODELS
const { blogModel } = require('../models');

// REQUIRE UTILS
const apiError = require('../utils/apiError');

/**
 * Creates a new blog.
 *
 * @function
 * @async
 * @param {Object} blogBody - The data for creating a new blog.
 * @returns {Promise<user>} A promise that resolves to the created blog.
 * @throws {apiError} If the blog ID is already taken, returns a 400 Bad Request error.
 */
const createBlog = async (blogBody) => {
    if (await blogModel.isBlogIdTaken(blogBody.blogId)) {
        throw new apiError(httpStatus.BAD_REQUEST, 'Blog ID already taken');
    }

    const user = new blogModel(blogBody);
    await user.save();

    return user;
};

/**
 * Get a blog by ID
 * 
 * @function
 * @async
 * @param {string} blogId - The blog's ID
 * @returns {Promise<user>} - Promise that resolved to the retrieved blog.
 */
const getBlog = async (blogId) => {
    return blogModel.findOne({ blogId });
};

/**
 * Get all blogs
 * 
 * @function
 * @async
 * @returns {Promise<user>} - Promise that resolved to the retrieved blogs.
 */
const getAllBlogs = async () => {
    return blogModel.find();
};

/**
 * Update blog details by ID
 * 
 * @function
 * @async
 * @param {string} blogId - The blog's ID
 * @param {Object} updatedBlogBody - The data to update.
 * @returns {Promise<user>} - Promise that resolved to the updated blog.
 * @throws {apiError} If the blog is not found or the blog ID is already taken, returns a 404 Not Found or 400 Bad Request error, respectively.
 */
const updateBlog = async (blogId, updatedBlogBody) => {
    const blog = await getBlog(blogId);

    if (!blog) {
        throw new apiError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    if (updatedBlogBody.blogId && (await blogModel.isBlogIdTaken(updatedBlogBody.blogId, blog.id))) {
        throw new apiError(httpStatus.BAD_REQUEST, 'Blog ID already taken');
    }

    Object.assign(blog, updatedBlogBody);
    await blog.save();
    return blog;
};

/**
 * Delete blog details by ID
 * 
 * @function
 * @async
 * @param {string} blogId - The blog's ID
 * @returns {Promise<user>} - Promise that resolved to the retrieved blog.
 */
const deleteBlog = async (blogId) => {
    const blog = await getBlog(blogId);

    if (!blog) {
        throw new apiError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    await blogModel.deleteOne({ blogId });

    return;
};

module.exports = {
    createBlog,
    getBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
};
