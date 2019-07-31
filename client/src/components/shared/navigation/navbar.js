import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  renderLinks = () => {
    return this.props.links.map((link, index) => {
      return (
        <NavLink exact to={link.href} key={index} className="nav-link" activeClassName="active">
          {link.display}
        </NavLink>
      );
    });
  };
  render() {
    return <div className="navbar">{this.renderLinks()}</div>;
  }
}

export default Navbar;
