// REQUIRE PACKAGES
const mongoose = require('mongoose');

// REQUIRE PLUGINS
const { toJson } = require('./plugins');

const trackerSchema = new mongoose.Schema(
    {
        blogId: {
            type: String,
            required: true,
            lowercase: true
        },
        sessionId: {
            type: String,
            unique: true,
            required: true
        },
        source: {
            type: String,
            enum: ['direct', 'email', 'home'],
            default: 'direct'
        }
    },
    {
        timestamps: true
    }
)

// add plugin that converts mongoose to json
trackerSchema.plugin(toJson);

/**
 * @typedef Tracker
 */
const Tracker = mongoose.model('tracker', trackerSchema);

module.exports = Tracker;