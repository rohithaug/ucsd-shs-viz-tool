const httpStatus = require('http-status');
const { trackBlogVisit } = require('../../../src/app/services/tracker.service');
const { getBlog } = require('../../../src/app/services/blog.service');
const { trackerModel } = require('../../../src/app/models');
const apiError = require('../../../src/app/utils/apiError');

jest.mock('../../../src/app/services/blog.service');
jest.mock('../../../src/app/models');

describe('trackBlogVisit', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error if eventBody does not contain blogId', async () => {
    const eventBody = {};
    const expectedError = new apiError(httpStatus.BAD_REQUEST, 'Insufficient data to track blog visit');

    await expect(trackBlogVisit(eventBody)).rejects.toThrow(expectedError);
  });

  test('should throw an error if blog is not found', async () => {
    const eventBody = { blogId: '123' };
    const expectedError = new apiError(httpStatus.NOT_FOUND, 'Blog not found');
    getBlog.mockResolvedValueOnce(null);

    await expect(trackBlogVisit(eventBody)).rejects.toThrow(expectedError);
    expect(getBlog).toHaveBeenCalledWith(eventBody.blogId);
  });
});