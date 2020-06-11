import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../../assets/stylesheets/auth.scss";
import { AuthContext } from "../auth/authContext";
import { AuthServices } from "../../../services/auth.service";
import { NavContext } from "./navContext";

function Navbar() {
  const [logout, setLogout] = useState(false);
  const context = useContext(AuthContext);
  const navContext = useContext(NavContext);

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
      default:
        currentPage = 1;
        break;
    }
    navContext.setLocation(currentPage);
  }, [context.user, navContext]);

  function clearUserDetails() {
    AuthServices.clearStorage();
    navContext.setLocation(1);
    setLogout(true);
    context.setUser({});
  }
  return (
    <div className="navbar">
      {logout ? (
        <Redirect to="/" />
      ) : (
        <span className="projectButtonWrap">
          <span>
            <Link
              to="/"
              key="/"
              className={
                (navContext.location === 1 ? "active " : "") + "nav-link"
              }
              onClick={() => navContext.setLocation(1)}
            >
              Home
            </Link>
            <Link
              to="/projects"
              key="/projects"
              className={
                (navContext.location === 2 ? "active " : "") + "nav-link"
              }
              onClick={() => navContext.setLocation(2)}
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
              <span>
                <Link
                  to="/login"
                  className={
                    (navContext.location === 3 ? "active " : "") + "nav-link"
                  }
                  onClick={() => navContext.setLocation(3)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={
                    (navContext.location === 4 ? "active " : "") + "nav-link"
                  }
                  onClick={() => navContext.setLocation(4)}
                >
                  Signup
                </Link>
              </span>
            )}
          </span>
        </span>
      )}
    </div>
  );
}

export default Navbar;
