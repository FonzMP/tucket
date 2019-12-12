import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  function loginUser() {
    console.log("logging in user", user);
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
