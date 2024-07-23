import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import CategoriesScrollList from "../../components/CategoriesScrollList";
import Loader from "../../components/Loader";


import blogsService from "../../services/blogsService";
import categoriesService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditBlogModal from "../../components/AddEditBlogModal";
import DeleteBlogModal from "../../components/DeleteBlogModal";

import "./index.css";

// const data = require("../../dummy-data.json");
// const blogsData = data.blogPosts.reverse();
// const categories = data.categories;

export default function BlogsPage() {
  const { categoryId: initialCategoryId } = useParams();
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [message, setMessage] = useState();
  const [addBlog, setAddBlog] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [deleteBlog, setDeleteBlog] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const blogRes = await blogsService.fetchBlogsByCategoryId(categoryId);
        const catRes = await categoriesService.getCategories();
        setBlogs(blogRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryId]);

  const onBlogAdd = (blog) => {
    setAddBlog({
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
      authorId: "",
    });
  };
  const onBlogEdit = (blog) => {
    setEditBlog(blog);
  };
  const onBlogDelete = (blog) => {
    setDeleteBlog(blog);
  };

  const createBlog = async (blog) => {
    try {
      setLoading(true);
      const blogRes = await blogsService.createBlog(blog);
      setBlogs([...blogs, blogRes.data]);
      setAddBlog(null);
      setMessage(blogRes.message);
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
      setLoading(false);
    }
  };

  const updateBlog = async (blog) => {
    try {
      setLoading(true);
      const blogRes = await blogsService.updateBlog(blog);
      const blogIndex = blogs.findIndex((b) => b.id === blog.id);
      const updatedBlogs = [...blogs];
      updatedBlogs[blogIndex] = blogRes.data;
      setBlogs(updatedBlogs);
      setEditBlog(null);
      setMessage("Blog updated successfully");
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setLoading(false);
    }
  };

  const removeBlog = async (blog) => {
    try {
      setLoading(true);
      await blogsService.deleteBlogsById(blog.id);
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(updatedBlogs);
      setDeleteBlog(null);
      setMessage("Blog deleted successfully");
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setLoading(false);
    }
  };

  const AddButton = () => {
    return (
      <button className="btn btn-outline-dark h-75" onClick={onBlogAdd}>
        ADD BLOG
      </button>
    );
  };


  if (loading) {
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
          setIsSuccess(false);
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          setIsError(false);
        }}
      />
      <AddEditBlogModal
        addBlog={addBlog}
        editBlog={editBlog}
        categories={categories}
        createBlog={createBlog}
        updateBlog={updateBlog}
        onClose={() => {
          setAddBlog(null);
          setEditBlog(null);
        }}
      />
      <DeleteBlogModal
        deleteBlog={deleteBlog}
        removeBlog={() => {
          removeBlog(deleteBlog);
        }}
        onClose={() => {
          setDeleteBlog(null);
        }}
      />
    </>
  );
}