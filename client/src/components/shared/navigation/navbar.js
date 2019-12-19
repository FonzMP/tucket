import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/stylesheets/auth.scss";

function Navbar() {
  const [activeWindow, setActiveWindow] = useState(1);

  useEffect(() => {
    let currentPage = 1;
    if (window.location.href.includes("/projects")) {
      currentPage = 2;
    }
    setActiveWindow(currentPage);
  }, [window]);
  return (
    <div className="navbar">
      <span className="projectButtonWrap">
        <span>
          <Link
            to="/"
            key="/"
            className={activeWindow === 1 ? "active nav-link" : "nav-link"}
            onClick={() => setActiveWindow(1)}
          >
            Home
          </Link>
          <Link
            to="/projects"
            key="/projects"
            className={activeWindow === 2 ? "active nav-link" : "nav-link"}
            onClick={() => setActiveWindow(2)}
          >
            Projects
          </Link>
        </span>
        <span>
          <Link
            className="nav-link"
            to="/login"
            className={activeWindow === 3 ? "active nav-link" : "nav-link"}
            onClick={() => setActiveWindow(3)}
          >
            Login
          </Link>
          <Link
            className="nav-link"
            to="/signup"
            className={activeWindow === 4 ? "active nav-link" : "nav-link"}
            onClick={() => setActiveWindow(4)}
          >
            Signup
          </Link>
        </span>
      </span>
    </div>
  );
}

export default Navbar;
