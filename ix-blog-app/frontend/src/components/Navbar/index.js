import React from 'react'
import "./index.css";

export default function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div style={{ margin: "0px 5%" }} className="container-fluid" id="bars">
          <a className="navbar-brand" href="#">
            iX Software Engineering Blog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">Img Here</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto" id="listies">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
