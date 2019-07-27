import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavLink extends Component {
  render() {
    return <Link to={this.props.link.href}>{this.props.link.display}</Link>;
  }
}

export default NavLink;
