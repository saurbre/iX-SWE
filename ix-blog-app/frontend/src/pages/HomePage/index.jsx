import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, reset as resetBlogs } from "../../features/blogSlice";
import { fetchCategories } from "../../features/categorySlice";

import BlogGrid from "../../components/BlogGrid";
import CategoriesList from "../../components/CategoryList";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Navbar from "../../components/Navbar";
import Subheading from "../../components/SubHeading";
import Loader from "../../components/Loader";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";


export default function HomePage() {
  const dispatch = useDispatch();
  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogsSuccess,
    isLoading: isBlogsLoading,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);
  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchCategories());
    return () => {
      dispatch(resetBlogs());
    };
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchBlogs());
      dispatch(fetchCategories());
    }
    fetchData();
  }, []);

  if (isBlogsLoading || isCategoriesLoading) {
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
          show={isBlogsSuccess || isCategoriesSuccess}
          message={blogsMessage || categoriesMessage}
          onClose={() => {
            //setIsSuccess(false);
          }}
        />
        <ErrorToast
          show={isBlogsError || isCategoriesError}
          message={blogsMessage || categoriesMessage}
          onClose={() => {
            //setIsError(false);
          }}
        />
      </div>
    </>
  );
}