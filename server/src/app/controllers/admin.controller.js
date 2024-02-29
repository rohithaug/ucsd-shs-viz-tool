// REQUIRE PACKAGES
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');

// REQUIRE SERVICES
const { adminService } = require('../services');

// REQUIRE UTILS
const catchAsync = require('../utils/catchAsync');

/**
 * Creates a new admin based on the request body.
 * 
 * @function
 * @async
 * @name createAdmin
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the admin is created and the response is sent.
 * @throws {Error} If there is an issue creating the admin or sending the response.
 */

const createAdmin = catchAsync(async (req, res) => {
    const admin = await adminService.createAdmin(req.body);
    res.status(httpStatus.CREATED).send(admin);
});

/**
 * Given admin email and password, returns if the admin is valid.
 * 
 * @function
 * @async
 * @name validateAdmin
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with admin details.
 * @throws {Error} If there is an issue validating admin or sending the response.
 */

const validateAdmin = catchAsync(async (req, res) => {
    const admin = await adminService.validateAdmin(req.body);
    if (!admin) {
        res.status(httpStatus.NOT_FOUND).send({
            message: 'Admin not found',
            description: 'The requested page does not exist.'
        });
    } else {
        res.status(httpStatus.OK).send(admin);
    }
});

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

const getAdminName = catchAsync(async (req, res) => {
    const admin = await adminService.getAdminName(req.params.adminId);
    if (!admin) {
        res.status(httpStatus.NOT_FOUND).send({
            message: 'Admin not found'
        });
    } else {
        res.status(httpStatus.OK).send(admin);
    }
});

/**
 * Given admin email and password, returns admin details along with a token.
 * 
 * @function
 * @async
 * @name signInAdmin
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Promise that resolves with admin details and token.
 * @throws {Error} If there is an issue signing in admin or sending the response.
 */
const signInAdmin = catchAsync(async (req, res) => {
    const admin = await adminService.signInAdmin(req);
    return res.status(httpStatus.OK).send(admin);
});


module.exports = {
    createAdmin,
    validateAdmin,
    getAdminName,
    signInAdmin,
};