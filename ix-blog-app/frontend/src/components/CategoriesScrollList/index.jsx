import React from "react";
import { useNavigate } from "react-router-dom";

import PropType from "prop-types";

export default function CategoriesScrollList({
  categories,
  categoryId,
  setCategoryId,
}) {
  const navigate = useNavigate();
  return categories.map((category, index) => {
    return categoryId === category.id ? (
      <button
        key={index}
        onClick={() => {
          navigate("/blogs");
          setCategoryId(null);
        }}
        style={{ color: "blue" }}
      >
        <p key={index}>{category.title}</p>
      </button>
    ) : (
      <button
        key={index}
        onClick={() => {
          navigate(`/blogs/${category.id}`);
          setCategoryId(category.id);
        }}
        style={{ color: "black" }}
      >
        <p key={index}>{category.title}</p>
      </button>
    );
  });
}

CategoriesScrollList.prototype = {
  categories: PropType.array.isRequired,
  categoryId: PropType.string.isRequired,
  setCategoryId: PropType.func.isRequired,
};