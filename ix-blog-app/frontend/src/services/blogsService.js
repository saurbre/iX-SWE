const getBlogs = async () => {
    try {
        const data = await fetch("https://ix-blog-app-2d5c689132cd.herokuapp.com/api/blogs");
        if (!data.ok) {
            console.log(data.statusText);
            throw Error(data.statusText);
        }
        const res = await data.json();
        return res;
    } catch (err) {
        throw Error(err);
    }
};

const getBlogsByCategoryID = async (id) => {
    let categoryIdReq = id ? id : null;
    try {
        const data = await fetch(`https://ix-blog-app-2d5c689132cd.herokuapp.com/api/blogs/category/` + categoryIdReq);
        if (!data.ok) {
            console.log(data.statusText);
            throw Error(data.statusText);
        }
        const res = await data.json();
        return res;
    } catch (err) {
        throw Error(err);
    }
};

const getBlogById = async (id) => {
    try {
      const data = await fetch(`https://ix-blog-app-2d5c689132cd.herokuapp.com/api/blogs/${id}`);
      if (!data.ok) {
        console.log(data.statusText);
        throw Error(data.statusText);
      }
      const res = await data.json();
      return res;
    } catch (err) {
      throw Error(err);
    }
};

const blogsService = {
    getBlogs,
    getBlogsByCategoryID,
    getBlogById,
};

export default blogsService;