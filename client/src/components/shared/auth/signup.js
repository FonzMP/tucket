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
  const tester = new RegExp(/^[a-zA-Z0-9]{6,14}$/);

  function signupUser() {
    if (
      (user.username.match(tester) && user.password.match(tester)) ||
      user.username.toLowerCase() === process.env.REACT_APP_ADMIN_USERNAME
    ) {
      AuthServices.signupUser(user)
        .then((resp) => resp.json())
        .then((response) => {
          if (!!response.error) {
            setErrorMsg(response.error);
            setShowError(true);
          } else {
            context.setUser(response.user);
            context.setToken(response.token);
            AuthServices.setStorage(response);
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log("error on signup ", err));
    } else {
      setErrorMsg(
        "Please input a valid username. (6 - 14 characters with numbers and letters only)"
      );
      setShowError(true);
    }
  }

  function handleOnChange(e) {
    if (
      user.username.length > 5 &&
      user.password.length > 5 &&
      e.key === "Enter"
    ) {
      signupUser();
    }
  }

  return (
    <span>
      <div className="modal"></div>
      {loggedIn ? <Redirect to="/projects" /> : null}
      <div className="modal-content">
        <h1>Signup</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          onChange={(e) => {
            handleOnChange(e);
            setUser({ ...user, username: e.target.value });
          }}
          onKeyDown={(e) => handleOnChange(e)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            handleOnChange(e);
            setUser({ ...user, password: e.target.value });
          }}
          onKeyDown={(e) => handleOnChange(e)}
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
