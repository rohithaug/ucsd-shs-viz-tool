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

// add plugin that converts mongoose to json
blogSchema.plugin(toJson);

/**
 * @typedef Blog
 */
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;