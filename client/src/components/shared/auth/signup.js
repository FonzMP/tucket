import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthServices } from "../../../services/auth.service";
import { AuthContext } from "./authContext";

function Signup() {
  const context = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function signupUser() {
    AuthServices.signupUser(user)
      .then(resp => resp.json())
      .then(response => {
        if (!!response.error) {
          setErrorMsg(response.error);
          setShowError(true);
        } else {
          setLoggedIn(true);
          context.setUser(response.user);
          AuthServices.setStorage(response.user);
        }
      })
      .catch(err => console.log("error on signup ", err));
  }

  function handleOnChange(e) {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      e.key === "Enter"
    ) {
      signupUser();
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <span>
      <div className="modal"></div>
      {loggedIn ? <Redirect to="/projects" /> : null}
      <div className="modal-content">
        <h1>Signup</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onKeyDown={e => handleOnChange(e)} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onKeyDown={e => handleOnChange(e)}
        />
        <div className="mock-button" onClick={() => signupUser()}>
          Signup
        </div>
        {showError ? <span className="errorFlash">{errorMsg}</span> : null}
      </div>
    </span>
  );
}

export default Signup;
