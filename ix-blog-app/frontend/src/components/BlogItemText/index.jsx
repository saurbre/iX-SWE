import React from "react";

import "./index.css";

import Categories from "../Categories";

export default function BlogItemText({ headerFontSize, blog }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p className="date-author-text">
          {blog.author.firstName} {blog.author.lastName}
        </p>
        <div className="dot-divider"></div>
        <p className="date-author-text">{blog.createdAt.substring(0, 10)}</p>
      </div>
      <p
        style={{
          fontSize: headerFontSize,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {blog.title}
      </p>
      <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
        {blog.description.substring(0, 100)}...
      </p>
      <Categories blog={blog} />
    </div>
  );
}