const httpStatus = require('http-status');
const { blogModel } = require('../../../src/app/models');
const apiError = require('../../../src/app/utils/apiError');
const {
  createBlog,
  getBlog,
  getAllBlogs,
  getAllBlogsIdAndCategory,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require('../../../src/app/services/blog.service');

jest.mock('../../../src/app/models');
jest.mock('../../../src/app/utils/apiError');

describe('blog.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('createBlog', () => {
    it('should create a new blog', async () => {
      const blogBody = { blogId: 'test-blog', title: 'Test Blog', content: 'Lorem ipsum dolor sit amet' };
      const saveMock = jest.fn();
      const user = { save: saveMock };

      blogModel.isBlogIdTaken.mockResolvedValue(false);
      blogModel.mockImplementation(() => user);

      const result = await createBlog(blogBody);

      expect(blogModel.isBlogIdTaken).toHaveBeenCalledWith(blogBody.blogId);
      expect(blogModel).toHaveBeenCalledWith(blogBody);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });

  describe('getBlog', () => {
    it('should get a blog by ID', async () => {
      const blogId = 'test-blog';
      const findOneMock = jest.fn();
      const blog = { blogId };

      blogModel.findOne.mockResolvedValue(blog);

      const result = await getBlog(blogId);

      expect(blogModel.findOne).toHaveBeenCalledWith({ blogId });
      expect(result).toBe(blog);
    });
  });

  describe('getAllBlogs', () => {
    it('should get all blogs', async () => {
      const blogs = [{ blogId: 'blog1' }, { blogId: 'blog2' }];
      blogModel.find.mockResolvedValue(blogs);

      const result = await getAllBlogs();

      expect(blogModel.find).toHaveBeenCalled();
      expect(result).toBe(blogs);
    });
  });

});