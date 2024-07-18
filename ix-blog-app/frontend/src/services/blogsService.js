const getBlogs = async () => {
    try {
        const data = await fetch("http://localhost:8000/api/blogs");
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
        const data = await fetch(`http://localhost:8000/api/blogs/category/` + categoryIdReq);
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
      const data = await fetch(`http://localhost:8000/api/blogs/${id}`);
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