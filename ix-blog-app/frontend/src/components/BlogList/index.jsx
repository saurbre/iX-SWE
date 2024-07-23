import React from "react";
import BlogItem from "../BlogItem";
import "./index.css";
import PropTypes from "prop-types";

export default function BlogList({ blogs, onBlogEdit, onBlogDelete }) {
  if (!blogs || !blogs.length) {
    return null;
  }

  return (
    <div className="blog-list">
      {blogs?.map((blog, index) => {
        return (
          <div key={index} id="blog-item">
            <BlogItem
              blog={blog}
              imageOrientation={"top"}
              onBlogEdit={onBlogEdit}
              onBlogDelete={onBlogDelete}
              key={index}
            />
          </div>
        );
      })}
    </div>
  );
}

BlogList.prototype = {
  blogs: PropTypes.array.isRequired,
  onBlogEdit: PropTypes.func,
  onBlogDelete: PropTypes.func,
};