import React, { useState, useEffect } from "react";

const AuthContext = React.createContext([{}, () => { }]);

const AuthContextProvider = props => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('')
  const state = {
    user,
    setUser,
    token,
    setToken
  };

  useEffect(() => {
    const tucketUser = JSON.parse(localStorage.getItem("tucketUser"));
    if (!!tucketUser) {
      setUser(tucketUser.user);
      setToken(tucketUser.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
