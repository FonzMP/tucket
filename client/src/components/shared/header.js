import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="projectButtonWrap header">
      <Link to="/" className="heroText">
        Tucket
      </Link>
    </div>
  );
}

export default Header;
