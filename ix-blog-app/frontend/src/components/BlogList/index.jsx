import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import BlogItem from "../BlogItem";

export default function BlogList({ blogPosts }) {
  return (
    <div className="blog-list">
      {blogPosts.map((blogPost, index) => {
        return (
          <div
            key={index}
            id="blog-item"
          >
            <BlogItem
              index={index}
              blogPost={blogPost}
              imageOrientation={"top"}
            />
          </div>
        );
      })}
    </div>
  );
}

BlogList.propTypes = {
  blogPosts: PropTypes.array.isRequired,
};