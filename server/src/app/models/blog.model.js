// REQUIRE PACKAGES
const mongoose = require('mongoose');

// REQUIRE PLUGINS
const { toJson } = require('./plugins');

const blogSchema = mongoose.Schema(
    {
        blogId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        imageName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

/**
 * Checks if an ID is already taken by an existing blog, excluding a specified blog.
 *
 * @static
 * @memberof Blog
 * @param {string} blogId - The blog ID to check.
 * @param {ObjectId} blogMongoId - The blog Mongo ID to exclude from the check.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the blog ID is taken (true) or not (false).
 */
blogSchema.statics.isBlogIdTaken = async function (blogId, excludeBlogMongoId) {
    const blog = await this.findOne({ blogId, _id: { $ne: excludeBlogMongoId }  });
    return !!blog;
};

// add plugin that converts mongoose to json
blogSchema.plugin(toJson);

/**
 * @typedef Blog
 */
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;