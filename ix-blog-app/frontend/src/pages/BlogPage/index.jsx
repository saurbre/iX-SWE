import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../../components/Categories";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import { fetchBlogById, setBlog } from "../../features/blogSlice";

import "./index.css";


export default function BlogPage() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const navigate = useNavigate();

  const {
    blog,
    isLoading,
  } = useSelector((state) => state.blogs);


  useEffect(() => {
    dispatch(fetchBlogById(blogId));
  }, [dispatch, blogId]);

  const navigateToAuthorProfile = () => {
    navigate("/profile");
  };

  if (isLoading || !blog) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <img src={blog.image} className="my-3 cover-img" alt="..." />
        <div className="row g-5">
          <div className="col-md-8">
            <article className="blog-post">
              <div className="my-5">
                <h2 className="blog-post-title">{blog.title}</h2>
                <p className="blog-post-meta">
                  {blog.updatedAt.slice(0, 10)} by{" "}
                  <Link to={"/profile/" + blog.author.id}>
                    {blog.author.firstName} {blog.author.lastName}
                  </Link>
                </p>
                <p>{blog.description}</p>
                <Categories blog={blog} />
              </div>
              <hr />
              {blog.content.map((content, index) => {
                return (
                  <div key={index} className="my-5">
                    <h2 className="my-3">{content.title}</h2>
                    <p>{content.text}</p>
                  </div>
                );
              })}
            </article>
          </div>
          <div className="author col-md-4" onClick={navigateToAuthorProfile}>
            <div className="position-sticky my-5" style={{ top: "2rem" }}>
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic">About the author</h4>
                <img src={blog.author.image} className="avatar" alt="..." />
                <p>{blog.author.bio.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}