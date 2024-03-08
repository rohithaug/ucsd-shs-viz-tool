// REQUIRE PACKAGES
const httpStatus = require('http-status');


// REQUIRE MODELS
const { adminModel } = require('../models');

// REQUIRE UTILS
const apiError = require('../utils/apiError');
const getToken = require('../utils/getToken');

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
    if (await adminModel.isEmailTaken(adminBody.email)) {
        throw new apiError(httpStatus.BAD_REQUEST, "Email already taken!");
    }
    try {
        const admin = await adminModel.create(adminBody);
        await admin.save();
        return admin;
    } catch (error) {
        throw new apiError(httpStatus.BAD_REQUEST, "Error creating admin");
    }
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

const validateAdmin = async (adminBody) => {
    try {
        const admin = await adminModel.findOne({ email: adminBody.email, password: adminBody.password });
        // Check if admin is not undefined
        if (!admin) {
            throw new apiError(httpStatus.NOT_FOUND, "Admin not found");
        }
        return admin;
    } catch (error) {
        throw new apiError(httpStatus.BAD_REQUEST, "Error validating admin");
    }
};

/**
 * Given admin email and hashed password, returns admin details along with a token.
 * 
 * @function
 * @async
 * @name signInAdmin
 * @param {Object} adminBody - The data for signing in an admin.
 * @returns {Promise<String>} Promise that resolves with admin details along with a token.
 * @throws {Error} If there is an issue signing in admin or sending the response.
 */

const signInAdmin = async (adminBody) => {
    const admin = await validateAdmin(adminBody.body);

    if (!admin) {
        throw new apiError(httpStatus.NOT_FOUND, "Admin not found");
    } else {
        return {
            email: admin.email,
            name: admin.name,
            token: getToken(admin)
        };
    }
};


module.exports = {
    createAdmin,
    validateAdmin,
    signInAdmin
};