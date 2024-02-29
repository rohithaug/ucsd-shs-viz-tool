// REQUIRE PACKAGES
const httpStatus = require('http-status');

// REQUIRE MODELS
const { adminModel } = require('../models');

// REQUIRE UTILS
const apiError = require('../utils/apiError');

/**
 * Creates a new admin based on the request body.
 * 
 * @function
 * @async
 * @name createAdmin
 * @param {Object} adminBody - The data for creating a new admin.
 * @returns {Promise<admin>} Promise that resolves when the admin is created and the response is sent.
 * @throws {Error} If there is an issue creating the admin or sending the response.
 */

const createAdmin = async (adminBody) => {
    if (await adminModel.isAdminIdTaken(adminBody.adminId)) {
        throw new apiError(httpStatus.BAD_REQUEST, "Admin ID already taken");
    }
    const admin = await adminModel.create(adminBody);
    await admin.save();

    return admin;
};

/**
 * Given admin email and hashed password, returns if the admin is valid.
 * 
 * @function
 * @async
 * @name validateAdmin
 * @param {Object} adminBody - The data for validating an admin.
 * @returns {Promise<String>} Promise that resolves with admin details.
 * @throws {Error} If there is an issue validating admin or sending the response.
 */

const validateAdmin = async (adminBody, res) => {
    const admin = await adminModel
        .findOne({ email: adminBody.email, password: adminBody.password });

    if (!admin) {
        throw new apiError(httpStatus.NOT_FOUND, "Admin not found");
    }

    return admin;
};

/**
 * Given admin ID, returns admin name.
 * 
 * @function
 * @async
 * @name getAdminName
 * @param {String} adminId - The admin's ID.
 * @returns {Promise<String>} Promise that resolves with admin name.
 * @throws {Error} If there is an issue getting admin name.
 */

const getAdminName = async (adminId) => {
    const admin = await adminModel.findOne({ adminId });
    return admin.name;
};


module.exports = {
    createAdmin,
    validateAdmin,
    getAdminName
};