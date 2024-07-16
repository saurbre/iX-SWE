import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import BlogList from "../../components/BlogList";
import Footer from "../../components/Footer";
import CategoriesScrollList from "../../components/CategoriesScrollList";

import "./index.css";

const data = require("../../dummy-data.json");
const blogsData = data.blogPosts.reverse();
const categories = data.categories;

export default function BlogsPage() {
  const { categoryId } = useParams();

  const [displayCategoryId, setDisplayCategoryId] = useState(
    categoryId && parseInt(categoryId)
  );
  const [blogs, setBlogs] = useState(blogsData);

  useEffect(() => {
    const filteredBlogs = blogsData.filter((blog) =>
      blog.categories.some((category) =>
        displayCategoryId === undefined
          ? true
          : category.id === displayCategoryId
      )
    );
    setBlogs(filteredBlogs);
  }, [displayCategoryId]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesScrollList
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setDisplayCategoryId}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Blog Posts</p>
        </div>
        <BlogList blogs={blogs} />
      </div>
      <Footer />
    </>
  );
}