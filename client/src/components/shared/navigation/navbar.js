import React, { Component } from "react";
import { Link } from "react-router-dom";
import NAVCONSTANTS from "../../_constants/NavigationConstants";

class Navbar extends Component {
  renderLinks = () => {
    return NAVCONSTANTS.NAV.map((link, index) => {
      return (
        <Link to={link.href} key={index}>
          {link.display}
        </Link>
      );
    });
  };
  render() {
    return <div>{this.renderLinks()}</div>;
  }
}

export default Navbar;
