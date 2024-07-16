import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import Subheading from "../../components/SubHeading";
import CategoriesList from "../../components/CategoryList";
import Footer from "../../components/Footer";

import categoryService from "../../services/categoryService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const categories = await categoryService.getCategories();
        setCategories(categories.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPageData();
  }, []);

  if (!categories) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <Subheading subHeading={"Categories"} />
        <CategoriesList categories={categories} />
        <Footer />
      </div>
    </>
  );
}