import React from "react";
import BlogItem from "../BlogItem";
import "./index.css";

export default function BlogList({ blogs }) {
  if (!blogs || !blogs.length) {
    return null;
  }

  return (
    <div className="blog-list">
      {blogs?.map((blog, index) => {
        return (
          <div key={index} id="blog-item">
            <BlogItem blog={blog} imageOrientation={"top"} />
          </div>
        );
      })}
    </div>
  );
}