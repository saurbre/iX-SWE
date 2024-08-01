import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Heading from "../../components/Heading";
import Subheading from "../../components/SubHeading";
import CategoriesList from "../../components/CategoryList";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import categoryService from "../../services/categoryService";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import AddEditCategoryModal from "../../components/AddEditCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  setAddCategory,
  setEditCategory,
  setDeleteCategory,
} from "../../features/categorySlice";

import useCategories from "../../hooks/useCategories";


export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { 
    categories, 
    addCategory, 
    editCategory, 
    deleteCategory, 
    isLoading, 
    isSuccess, 
    isError, 
    message 
  } = useSelector((state) => state.categories);
  // const [categories, setCategories] = useState();
  // const [loading, setLoading] = useState(false);
  // const [addCategory, setAddCategory] = useState();
  // const [editCategory, setEditCategory] = useState();
  // const [deleteCategory, setDeleteCategory] = useState();
  // const [message, setMessage] = useState();
  // const [isSuccess, setIsSuccess] = useState();
  // const [isError, setIsError] = useState();

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const fetchPageData = async () => {
      dispatch(fetchCategories());
    };
    fetchPageData();
  }, [dispatch]);

  const onCategoryAdd = () => {
    dispatch(setAddCategory({
      title: "",
      description: "",
      color: "#000000",
    }));
  };

  const { createCategory, updateCategory } = useCategories();

  const onCategoryUpdate = (category) => {
    dispatch(setEditCategory(category));
  };

  const onCategoryDelete = (category) => {
    dispatch(setDeleteCategory(category));
  };

  const AddButton = () => {
    if(!user?.token) return null;
    return (
      <button className="btn btn-outline-dark h-75" onClick={onCategoryAdd}>
        ADD CATEGORY
      </button>
    );
  };
  if (!categories) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle" style={{marginTop: "0px"}}>Categories</p>
          <AddButton />
        </div>
        <CategoriesList
          categories={categories}
          onEdit={onCategoryUpdate}
          onDelete={onCategoryDelete}
        ></CategoriesList>
      </div>
      <Footer />
      <AddEditCategoryModal
        addCategory={addCategory}
        editCategory={editCategory}
        createCategory={createCategory}
        updateCategory={updateCategory}
        onClose={() => {
          setAddCategory(null);
          setEditCategory(null);
        }}
      />
      <DeleteCategoryModal
        deleteCategory={deleteCategory}
        // removeCategory={removeCategory}
        onClose={() => setDeleteCategory(null)}
      />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {

        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
        }}
      />
    </>
  );
}