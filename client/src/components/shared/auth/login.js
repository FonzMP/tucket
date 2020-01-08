import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./authContext";
import { AuthServices } from "../../../services/auth.service";

function Login() {
  const context = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  function loginUser() {
    AuthServices.loginUser(user)
      .then(resp => resp.json())
      .then(response => {
        if (!!response.error) {
          setErrorMsg(response.error);
          setShowError(true);
          setUser({ username: "", password: "" });
        } else {
          setLoggedIn(true);
          context.setUser(response.user);
          AuthServices.setStorage(response.user);
        }
      })
      .catch(err => console.log("error here in login", err));
  }

  function handleOnChange(e) {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      e.key === "Enter"
    ) {
      loginUser();
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
          value={user.username}
          onChange={e => handleOnChange(e)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          defaultValue={user.password}
          onKeyUp={e => handleOnChange(e)}
        />
        <div className="mock-button" onClick={() => loginUser()}>
          Login
        </div>
        {showError ? <span className="errorFlash">{errorMsg}</span> : null}
      </div>
    </span>
  );
}

export default Login;
