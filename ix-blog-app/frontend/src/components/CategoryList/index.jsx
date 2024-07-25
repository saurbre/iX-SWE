import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./index.css";
import EditButtons from "../EditButtons";

export default function CategoriesList({ categories, onEdit, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const navigateToBlog = (categoryId) => {
    navigate("/blogs/" + categoryId);
  };

  return (
    <div className="category-list">
      {categories.map((category) => {
        return (
          <button
            key={category.id}
            className="card"
            style={{ borderRadius: "0px", border: "none", padding: "0px" }}
            onClick={() => {
              navigateToBlog(category.id);
            }}
          >
            <div
              className="card-body"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                zIndex: 0,
                width: "100%",
              }}
            >
              <h5 className="card-title">{category.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                {category.description.substring(0, 100)} ...
              </p>
            </div>
            {user && user.token && onEdit && onDelete && (
              <EditButtons onEdit={()=>{
                onEdit(category);
              }} onDelete={()=>{
                onDelete(category);
              }} onNavigate={()=>{
                navigateToBlog(category.id);
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

CategoriesList.prototype = {
  categories: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};