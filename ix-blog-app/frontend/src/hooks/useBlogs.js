import { useDispatch } from "react-redux";
import { setAddBlog, createBlog, updateBlog } from "../features/blogSlice";

const useBlogs = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  
  const onBlogAdd = (blog) => {
    dispatch(setAddBlog({
      // image: "",
      title: "",
      description: "",
      categories: [],
      content: [
        {
          sectionHeading: "",
          sectionText: "",
        },
      ],
      authorId: user._id,
    }));
  };

  const createBlog = async (blog) => {
    dispatch(createBlog(blog));
  };

  const updateBlog = async (blog) => {
    dispatch(updateBlog(blog));
  };

  return {
    onBlogAdd,
    createBlog,
    updateBlog,
  };
};

export default useBlogs;