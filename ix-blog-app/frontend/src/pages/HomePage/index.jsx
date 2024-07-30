import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, reset as resetBlogs } from "../../features/blogSlice";

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
  // const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [isSuccess, setIsSuccess] = useState();
  // const [isError, setIsError] = useState();
  // const [message, setMessage] = useState();

  const dispatch = useDispatch();
  const {
    blogs,
    isError,
    isSuccess,
    isLoading,
    message,
  } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
    return () => {
      dispatch(resetBlogs());
    };
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchBlogs());
      const catRes = await categoriesService.getCategories();
      setCategories(catRes.data);
    }
    fetchData();
  }, []);

  if (isLoading) {
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
            //setIsSuccess(false);
          }}
        />
        <ErrorToast
          show={isError}
          message={message}
          onClose={() => {
            //setIsError(false);
          }}
        />
      </div>
    </>
  );
}