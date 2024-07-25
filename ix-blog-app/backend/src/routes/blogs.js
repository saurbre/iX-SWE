const express = require("express");
const blogsController = require("../controllers/blogController");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, (req, res) => {
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

router.put("/:id", protect, (req, res) => {
  blogsController.updateBlogById(req, res);
});

router.delete("/:id", protect, (req, res) => {
  blogsController.deleteBlogById(req, res);
});

module.exports = router;