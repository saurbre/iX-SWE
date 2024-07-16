import React from "react";

import "./index.css";

export default function Categories({ blog }) {
  return (
    <div className="flex-wrap">
      {blog.categories.map((category, index) => {
        return (
          <p
            key={index}
            className="category-tag"
            style={{
              color: category.color,
              backgroundColor: category.color + "33",
            }}
          >
            {category.title}
          </p>
        );
      })}
    </div>
  );
}