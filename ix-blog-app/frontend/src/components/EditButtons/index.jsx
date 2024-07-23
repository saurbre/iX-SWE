import React from "react";

import PropTypes from "prop-types";

export default function EditButtons({ onEdit, onDelete, onNavigate, className }) {
  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "60px",
          border: "none",
          zIndex: 1,
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "0%",
        }}
        type="button"
        className={`btn ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "35px",
          border: "none",
          zIndex: 1,
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "0%",
        }}
        type="button"
        className={`btn ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          zIndex: 1,
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "0%",
        }}
        type="button"
        className={`btn ${className}`}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate();
        }}
      >
        <i className="bi bi-arrows-fullscreen"></i>
      </button>
    </>
  );
}

EditButtons.prototype = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  className: PropTypes.string,
};