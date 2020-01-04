import React, { useState } from "react";
import { AuthServices } from "../../../services/auth.service";

function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });

  function signupUser() {
    AuthServices.signupUser(user)
      .then(resp => resp.json())
      .then(response => console.log("response from signup ", response))
      .catch(err => console.log("error on signup ", err));
  }

  return (
    <span>
      <div className="modal"></div>
      <div className="modal-content">
        <h1>Signup</h1>
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
        <div className="mock-button" onClick={() => signupUser()}>
          Signup
        </div>
      </div>
    </span>
  );
}

export default Signup;
