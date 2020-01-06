import React, { useState, useEffect } from "react";

const AuthContext = React.createContext([{}, () => {}]);

const AuthContextProvider = props => {
  const [user, setUser] = useState({});
  const state = {
    user,
    setUser
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("tucketUser"));
    if (!!user) {
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
