import React from "react";
import { NavLink } from "react-router-dom";
import "../../../assets/stylesheets/auth.scss";

function Navbar(props) {
  function renderLinks() {
    return props.links.map((link, index) => {
      return link.display !== null ? (
        <NavLink
          exact
          to={link.href}
          key={index}
          className="nav-link"
          activeClassName="active"
        >
          {link.display}
        </NavLink>
      ) : null;
    });
  }
  return (
    <div className="navbar">
      <span className="projectButtonWrap">
        <span>{renderLinks()}</span>
        <span>
          <NavLink className="nav-link" activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/signup">
            Signup
          </NavLink>
        </span>
      </span>
    </div>
  );
}

export default Navbar;
