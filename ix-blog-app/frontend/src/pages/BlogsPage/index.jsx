import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import "./index.css";

// Services
import blogsService from "../../services/blogsService";
import categoriesService from "../../services/categoryService";

// Components
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";
import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import CategoriesScrollList from "../../components/CategoriesScrollList";
import Loader from "../../components/Loader";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { 
  setBlogs, 
  setAddBlog, 
  setEditBlog, 
  setDeleteBlog, 
  fetchBlogsByCategoryId,
} from "../../features/blogSlice";

export default function BlogsPage() {
  const dispatch = useDispatch();
  const { 
    blogs, 
    addBlog, 
    editBlog, 
    deleteBlog, 
    isLoading, 
    isSuccess, 
    isError, 
    message 
  } = useSelector((state) => state.blogs);

  const { onBlogAdd, createBlog, updateBlog } = useBlogs();
  const { categoryId: initialCategoryId } = useParams();
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [categories, setCategories] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchBlogsByCategoryId(categoryId));
      const catRes = await categoriesService.getCategories();
      setCategories(catRes.data);
    }
    fetchData();
  }, [categoryId]);

  const onBlogEdit = (blog) => {
    dispatch(setEditBlog(blog));
  };
  const onBlogDelete = (blog) => {
    dispatch(setDeleteBlog(blog));
  };

  const removeBlog = async (blog) => {
    await blogsService.deleteBlogsById(blog.id);
    const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
    dispatch(setBlogs(updatedBlogs));
    dispatch(setDeleteBlog(null));
  };

  const AddButton = () => {
    if(!user?.token) return null;
    return (
      <button className="btn btn-outline-dark h-75" onClick={onBlogAdd}>
        ADD BLOG
      </button>
    );
  };


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesScrollList
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle" style={{marginTop: "0px"}}>Blog Posts</p>
          <AddButton />
        </div>
        <BlogList 
          blogs={blogs} 
          onBlogEdit={onBlogEdit}
          onBlogDelete={onBlogDelete}
        />
      </div>
      <Footer />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          // dispatch(setIsSuccess(false));
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          // dispatch(setIsError(false));
        }}
      />
      <AddEditBlogModal
        addBlog={addBlog}
        editBlog={editBlog}
        categories={categories}
        createBlog={createBlog}
        updateBlog={updateBlog}
        onClose={() => {
          dispatch(setAddBlog(null));
          dispatch(setEditBlog(null));
        }}
      />
      <DeleteBlogModal
        deleteBlog={deleteBlog}
        removeBlog={() => {
          removeBlog(deleteBlog);
        }}
        onClose={() => {
          dispatch(setDeleteBlog(null));
        }}
      />
    </>
  );
}