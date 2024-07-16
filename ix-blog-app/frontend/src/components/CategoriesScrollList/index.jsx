import React from "react";

import PropType from "prop-types";

export default function CategoriesScrollList({
  categories,
  categoryId,
  setCategoryId,
}) {
  return categories.map((category, index) => {
    return categoryId == category.id.toString() ? (
      <button
        key={index}
        onClick={() => setCategoryId(category.id)}
        style={{ color: "blue" }}
      >
        <p key={index}>{category.title}</p>
      </button>
    ) : (
      <button
        key={index}
        onClick={() => {
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