const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    // const categoryIds = req.body.categories.map(category=>{return category.blogId});
    const blog = new Blog ({
      title:req.body.title,
      description:req.body.description,
      image:req.body.image,
      content:req.body.content,
      authorId:req.body.authorId,
      categoryIds:req.body.categoryIds,
    });
    const newBlog = await blog.save();
    res.status(201).json({ message: "Blog created!", data: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogsRed = await Blog.find();
    res.status(200).json({ message: "Return all blogs!", data: blogsRed });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error });
  }
};

const getBlogsById = async (req, res) => {
  try {
    const blogsRed = await Blog.findById(req.params.blogid);
    res.status(200).json({ message: "Return blog by Id!", data: blogsRed });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error });
  }
};

const getBlogsByCategoryId = async (req, res) => {
  try {
    const blogsRed = await Blog.find({categoryIds: req.params.categoryId});
    res.status(200).json({ message: "Return blog by Id!", data: blogsRed });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error });
  }
}

const updateBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (blog) {
      blog.authorId = req?.body?.authorId || blog.authorId;
      blog.categoryIds = req?.body?.categoryIds || blog.categoryIds;
      blog.title = req?.body?.title || blog.title;
      blog.description = req?.body?.description || blog.description;
      blog.image = req?.body?.image || blog.image;
      blog.content = req?.body?.content || blog.content;
      const updatedBlog = await blog.save();
      res.status(200).json({ message: "Blog updated!", data: updatedBlog });
    } else {
      res.status(404).json({ message: "Blog not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.blogId);
    if (blog) {
      return res.status(200).json({ message: "Blog deleted!" });
    } else {
      return res.status(404).json({ message: "Blog not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogsById,
  getBlogsByCategoryId,
  updateBlogById,
  deleteBlogById,
};