import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth/authContext";

function Header() {
  const context = useContext(AuthContext);
  return (
    <div className="projectButtonWrap header">
      <span>
        <Link to="/" className="heroText">
          Tucket
        </Link>
      </span>
      <span>
        {!!context.user.username ? (
          <h5>Logged in as: {context.user.username.toUpperCase()}</h5>
        ) : null}
      </span>
    </div>
  );
}

export default Header;
