const catchAsync = require('../../../src/app/utils/catchAsync');

describe('catchAsync', () => {
  test('should return a function', () => {
    const asyncFn = jest.fn();
    const wrappedFn = catchAsync(asyncFn);

    expect(typeof wrappedFn).toBe('function');
  });

  test('should call the provided asynchronous function with the correct arguments', () => {
    const asyncFn = jest.fn();
    const req = {};
    const res = {};
    const next = jest.fn();
    const wrappedFn = catchAsync(asyncFn);

    wrappedFn(req, res, next);

    expect(asyncFn).toHaveBeenCalledWith(req, res, next);
  });

  test('should call the Express error handler if the asynchronous function throws an error', () => {
    const asyncFn = jest.fn().mockRejectedValue(new Error('Test Error'));
    const req = {};
    const res = {};
    const next = jest.fn();
    const wrappedFn = catchAsync(asyncFn);

    wrappedFn(req, res, next);

    expect(asyncFn).toHaveBeenCalledWith(req, res, next);
  });
});