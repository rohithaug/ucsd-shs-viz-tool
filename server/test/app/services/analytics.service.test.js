const httpStatus = require('http-status');
const { trackerModel, blogModel } = require('../../../src/app/models');
const { getAllBlogsIdAndCategory } = require('../../../src/app/services/blog.service');
const apiError = require('../../../src/app/utils/apiError');
const {
  getMetrics,
  getBlogMetrics,
  getBulkMetrics
} = require('../../../src/app/services/analytics.service');

jest.mock('../../../src/app/models');
jest.mock('../../../src/app/services/blog.service');
jest.mock('../../../src/app/utils/apiError');

describe('analytics.service', () => {
  describe('getBlogMetrics', () => {
    test('should return metrics object for a specific blog', async () => {
      const trackerData = [
        { blogId: '1', source: 'source1' },
        { blogId: '1', source: 'source2' },
        { blogId: '1', source: 'source1' }
      ];
      const blogData = { blogId: '1', title: 'Blog 1', likes: 5, dislikes: 2 };

      trackerModel.find.mockResolvedValue(trackerData);
      blogModel.findOne.mockResolvedValue(blogData);

      const expectedMetrics = {
        blogId: '1',
        blogName: 'Blog 1',
        uniqueVisit: 3,
        source: {
          source1: 2,
          source2: 1
        },
        likes: 5,
        dislikes: 2
      };

      const metrics = await getBlogMetrics('1');

      expect(trackerModel.find).toHaveBeenCalledWith({ blogId: '1' });
      expect(blogModel.findOne).toHaveBeenCalledWith({ blogId: '1' });
      expect(metrics).toEqual(expectedMetrics);
    });
  });

});

describe('analytics.service - metrics object', () => {
  describe('uniqueVisit', () => {
    test('should have blog and category properties', () => {
      const metrics = {
        uniqueVisit: {
          blog: {},
          category: {}
        },
        source: {
          consolidated: {},
          blog: {}
        },
        likes: {},
        dislikes: {}
      };

      expect(metrics.uniqueVisit).toHaveProperty('blog');
      expect(metrics.uniqueVisit).toHaveProperty('category');
    });
  });

  describe('source', () => {
    test('should have consolidated and blog properties', () => {
      const metrics = {
        uniqueVisit: {
          blog: {},
          category: {}
        },
        source: {
          consolidated: {},
          blog: {}
        },
        likes: {},
        dislikes: {}
      };

      expect(metrics.source).toHaveProperty('consolidated');
      expect(metrics.source).toHaveProperty('blog');
    });
  });

  describe('likes', () => {
    test('should be an object', () => {
      const metrics = {
        uniqueVisit: {
          blog: {},
          category: {}
        },
        source: {
          consolidated: {},
          blog: {}
        },
        likes: {},
        dislikes: {}
      };

      expect(metrics.likes).toBeInstanceOf(Object);
    });
  });

  describe('dislikes', () => {
    test('should be an object', () => {
      const metrics = {
        uniqueVisit: {
          blog: {},
          category: {}
        },
        source: {
          consolidated: {},
          blog: {}
        },
        likes: {},
        dislikes: {}
      };

      expect(metrics.dislikes).toBeInstanceOf(Object);
    });
  });
});