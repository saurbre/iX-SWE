import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import CategoriesScrollList from "../../components/CategoriesScrollList";
import Loader from "../../components/Loader";

import AddEditBlogModal from "../../components/AddEditBlogModal";

import blogsService from "../../services/blogsService";
import categoriesService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

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
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList blogs={blogs} />
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
    </>
  );
}