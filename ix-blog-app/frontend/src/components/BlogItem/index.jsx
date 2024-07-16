import React from "react";
import { useNavigate } from "react-router-dom";

import BlogItemText from "../BlogItemText";

import "./index.css";

export default function BlogItem({ index, blog, imageOrientation }) {
  const navigate = useNavigate();
  const navigateToBlog = () => {
    navigate("/blog/" + blog.id);
  };
  if (imageOrientation === "top") {
    return (
      <div key={index} className="card-1" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText blog={blog} headerFontSize="20px"></BlogItemText>
        </div>
      </div>
    );
  } else {
    return (
      <div key={index} className="card-2" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-left" alt="..." />
        <div className="card-text-right">
          <BlogItemText blog={blog} headerFontSize="20px"></BlogItemText>
        </div>
      </div>
    );
  }
}