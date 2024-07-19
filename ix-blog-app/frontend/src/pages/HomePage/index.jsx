import React, { useState, useEffect } from "react";

import BlogGrid from "../../components/BlogGrid";
import CategoriesList from "../../components/CategoryList";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import Subheading from "../../components/SubHeading";
import Loader from "../../components/Loader";

import blogsService from "../../services/blogsService";
import categoriesService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

export default function HomePage() {
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
        const blogRes = await blogsService.fetchBlogs();
        const catRes = await categoriesService.getCategories();
        setBlogs(blogRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setMessage(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <Subheading subHeading={"Recent blogs"} />
        <BlogGrid blogs={blogs} />
        <Subheading subHeading={"Categories"} />
        <CategoriesList categories={categories} />
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
      </div>
    </>
  );
}