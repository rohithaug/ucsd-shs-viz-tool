/**
 * An asynchronous utility function that catches errors and passes them to the Express error handler.
 *
 * @function
 * @async
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} A function that handles errors and passes them to the Express error handler.
 * @throws {Error} If there is an issue with the asynchronous function.
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync
