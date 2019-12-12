import React from "react";
import { Link } from "react-router-dom";

function AuthNav() {
  return (
    <span className="authNavWrapper">
      <Link className="mock-button" to="/login">
        Login
      </Link>
      <Link className="mock-button" to="/signup">
        Signup
      </Link>
    </span>
  );
}

export default AuthNav;
