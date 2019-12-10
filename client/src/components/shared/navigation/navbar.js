import React from "react";
import { NavLink } from "react-router-dom";

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
  return <div className="navbar">{renderLinks()}</div>;
}

export default Navbar;
