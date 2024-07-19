const express = require("express");
const blogsController = require("../controllers/blogController");

const router = express.Router();

router.post("/", (req, res) => {
  blogsController.createBlog(req, res);
});

router.get("/", (req, res) => {
  blogsController.getBlogs(req, res);
});

router.get("/:id", (req, res) => {
  blogsController.getBlogById(req, res);
});

router.get("/category/:id", (req, res) => {
  blogsController.getBlogByCategoryId(req, res);
});

router.put("/:id", (req, res) => {
  blogsController.updateBlogById(req, res);
});

router.delete("/:id", (req, res) => {
  blogsController.deleteBlogById(req, res);
});

module.exports = router;