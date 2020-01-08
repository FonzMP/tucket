import React, { useState } from "react";

const NavContext = React.createContext([{}, () => {}]);

const NavContextProvider = props => {
  const [location, setLocation] = useState(1);
  const state = {
    location,
    setLocation
  };

  return (
    <NavContext.Provider value={state}>{props.children}</NavContext.Provider>
  );
};

export { NavContext, NavContextProvider };
