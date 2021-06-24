import React, { useState, createContext } from "react";

export const GlobalSpinnerContext = createContext();

const GlobalSpinnerContextProvider = (children) => {
  const [Auth, setAuth] = useState(false);
  return (
    <GlobalSpinnerContext.Provider value={{ Auth, setAuth }}>
      {{ children }}
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
