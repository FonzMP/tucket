import React, { useState } from "react";
import { AuthServices } from "../../../services/auth.service";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  function loginUser() {
    AuthServices.loginUser(user)
      .then(resp => resp.json())
      .then(response => console.log("response ", response))
      .catch(err => console.log("error here in login", err));
  }

  return (
    <span>
      <div className="modal"></div>
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
