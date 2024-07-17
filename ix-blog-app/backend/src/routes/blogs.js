const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogController");

router.post("/", (req, res) => {
    blogsController.createBlog(req, res);
});

router.get("/", (req, res) => {
    blogsController.getBlogs(req, res);
});

router.get("/:blogId", (req, res) => {
    blogsController.getBlogsById(req, res);
});

router.put("/:blogId", (req, res) => {
    blogsController.updateBlogsById(req, res);
});

router.delete("/:blogId", (req, res) => {
    blogsController.deleteBlogById(req, res);
});

module.exports = router;