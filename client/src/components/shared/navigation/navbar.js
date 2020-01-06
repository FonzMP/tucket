import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../../assets/stylesheets/auth.scss";
import { AuthContext } from "../auth/authContext";
import { AuthServices } from "../../../services/auth.service";

function Navbar() {
  const [activeWindow, setActiveWindow] = useState(1);
  const [logout, setLogout] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    let currentPage;
    let pathName = window.location.pathname;
    switch (pathName) {
      case "/":
        currentPage = 1;
        break;
      case "/projects":
        currentPage = 2;
        break;
      case "/login":
        currentPage = 3;
        break;
      case "/signup":
        currentPage = 4;
        break;
    }
    setActiveWindow(currentPage);
  }, []);

  function clearUserDetails() {
    AuthServices.clearStorage();
    setActiveWindow(1);
    setLogout(true);
    context.setUser({});
  }
  return (
    <div className="navbar">
      {logout ? <Redirect to="/" /> : null}
      <span className="projectButtonWrap">
        <span>
          <Link
            to="/"
            key="/"
            className={(activeWindow === 1 ? "active " : "") + "nav-link"}
            onClick={() => setActiveWindow(1)}
          >
            Home
          </Link>
          <Link
            to="/projects"
            key="/projects"
            className={(activeWindow === 2 ? "active " : "") + "nav-link"}
            onClick={() => setActiveWindow(2)}
          >
            Projects
          </Link>
        </span>
        <span>
          {!!context.user.username ? (
            <span className="nav-link" onClick={() => clearUserDetails()}>
              Logout
            </span>
          ) : (
            <Link
              to="/login"
              className={(activeWindow === 3 ? "active " : "") + "nav-link"}
              onClick={() => setActiveWindow(3)}
            >
              Login
            </Link>
          )}

          <Link
            to="/signup"
            className={(activeWindow === 4 ? "active " : "") + "nav-link"}
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
