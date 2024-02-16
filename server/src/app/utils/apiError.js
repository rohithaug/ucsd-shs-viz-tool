/**
 * Custom error class for representing API-related errors with a specific status code.
 *
 * @class
 * @extends Error
 * @param {number} statusCode - HTTP status code associated with the error.
 * @param {string} message - Error message providing additional information about the error.
 */
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ApiError;
