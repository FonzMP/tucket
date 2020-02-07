import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./authContext";
import { AuthServices } from "../../../services/auth.service";
import { NavContext } from "../navigation/navContext";

function Login({ history }) {
  const initialLogin = { username: "", password: "" };
  const context = useContext(AuthContext);
  const navContext = useContext(NavContext);
  const [user, setUser] = useState(initialLogin);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const tester = new RegExp(/^[a-zA-Z0-9]{8,14}$/);

  useEffect(() => {
    const checkState = history.location.state;
    if (!!checkState && checkState.error) {
      navContext.setLocation(3);
      setErrorMsg(checkState.error);
      setShowError(true);
    }
  }, [history.location.state, navContext]);
  function loginUser() {
    if (
      (user.username.match(tester) && user.password.match(tester)) ||
      user.username.toLowerCase() === process.env.REACT_APP_ADMIN_USERNAME
    ) {
      AuthServices.loginUser(user)
        .then(resp => resp.json())
        .then(response => {
          if (!!response.error) {
            setErrorMsg(response.error);
            setShowError(true);
            setUser(initialLogin);
          } else {
            setLoggedIn(true);
            context.setUser(response.user);
            AuthServices.setStorage(response.user);
          }
        })
        .catch(err => console.log("error here in login", err));
    } else {
      setErrorMsg(
        "Username and password must be 8-14 chars and consist of letters and numbers only."
      );
      setShowError(true);
    }
  }

  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      loginUser();
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
          onKeyUp={e => handleKeyUp(e)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={e => handleOnChange(e)}
          onKeyUp={e => handleKeyUp(e)}
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
