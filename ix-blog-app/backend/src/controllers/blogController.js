const createBlog = (req, res) => {
  res.json({ message: "Blog created!", data: [] });
};

const getBlogs = (req, res) => {
    res.json({ message: "Return all blogs!", data: [] });
};

const getBlogsById = (req, res) => {
  res.json({ message: "Return blog by Id!", data: [] });
};

const updateBlogsById = (req, res) => {
  res.json({ message: "Blog updated by Id!", data: [] });
};

const deleteBlogById = (req, res) => {
  res.json({ message: "Blog deleted by Id!", data: [] });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogsById,
  updateBlogsById,
  deleteBlogById,
};