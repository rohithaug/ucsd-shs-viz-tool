// REQUIRE PACKAGES
const mongoose = require('mongoose');

// REQUIRE PLUGINS
const { toJson } = require('./plugins');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

/**
 * Checks if an admin email is already taken by an existing admin, excluding a specified admin.
 * 
 * @static
 * @memberof Admin
 * @param {string} adminEmail - The admin email to check.
 * @param {ObjectId} adminMongoId - The admin Mongo ID to exclude from the check.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the email is taken (true) or not (false).
 */
adminSchema.statics.isEmailTaken = async function (adminEmail, excludeAdminMongoId) {
    const admin = await this.findOne({ adminEmail, _id: { $ne: excludeAdminMongoId } });
    return !!admin;
}

// add plugin that converts mongoose to json
adminSchema.plugin(toJson);

/**
 * @typedef Admin
 */
const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;