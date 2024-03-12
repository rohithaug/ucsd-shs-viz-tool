const ApiError = require('../../../src/app/utils/apiError');

describe('ApiError', () => {
  test('should create an instance of ApiError with the provided status code and message', () => {
    const statusCode = 404;
    const message = 'Not Found';
    const apiError = new ApiError(statusCode, message);

    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.statusCode).toBe(statusCode);
    expect(apiError.message).toBe(message);
  });

  test('should inherit from Error class', () => {
    const apiError = new ApiError(500, 'Internal Server Error');

    expect(apiError).toBeInstanceOf(Error);
  });
});