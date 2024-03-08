// REQUIRE ROUTE HANDLER
const express = require("express");
const router = express.Router();

// REQUIRE CONTROLLERS
const { blogController } = require("../../controllers");

// CREATE REQUEST FOR BLOG
router.post("/", blogController.createBlog);

// GET REQUEST FOR BLOG IMAGE
router.get("/image", blogController.getBlogImage);

// GET REQUEST FOR ALL BLOGS
router.get("/bulk", blogController.getAllBlogs);

// GET REQUEST FOR BLOG
router.get("/:blogId", blogController.getBlog);

// UPDATE REQUEST FOR BLOG
router.put("/:blogId", blogController.updateBlog);

// LIKE REQUEST FOR BLOG
router.get("/like/:blogId", blogController.likeBlog);

// DISLIKE REQUEST FOR BLOG
router.get("/dislike/:blogId", blogController.dislikeBlog);

// DELETE REQUEST FOR BLOG
router.delete("/:blogId", blogController.deleteBlog);

module.exports = router;