import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./authContext";
import { AuthServices } from "../../../services/auth.service";

function Login() {
  const context = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  function loginUser() {
    AuthServices.loginUser(user)
      .then(resp => resp.json())
      .then(response => {
        setLoggedIn(true);
        response.user.password = "";
        context.setUser(response.user);
        localStorage.setItem("tucketUser", JSON.stringify(response.user));
      })
      .catch(err => console.log("error here in login", err));
  }

  return (
    <span>
      <div className="modal"></div>
      {loggedIn ? <Redirect to="/projects" /> : null}
      <div className="modal-content">
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
        />
        <div className="mock-button" onClick={() => loginUser()}>
          Login
        </div>
      </div>
    </span>
  );
}

export default Login;
