"use client";

import React, { createContext, useContext, useState } from "react";
const GlobalContext = createContext({
  userLogged: false,
  setUserLogged: () => false,
  USER: { id: "", name: "", phone: "", email: "", gp: "", isAdmin: false },
  setUSER: () => {},
  stateArray: [],
  setStateArray: () => [],
  stateObject: {},
  setStateObject: () => {},
  userState:[],
  setUserState: () => [],
});
export const GlobalContextProvider = ({ children }) => {
  const [USER, setUSER] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    gp: "",
    isAdmin: false,
  });
  const [userLogged, setUserLogged] = useState(false);
  const [stateArray, setStateArray] = useState([]);
  const [stateObject, setStateObject] = useState({});
  const [userState, setUserState] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        userLogged,
        setUserLogged,
        USER,
        setUSER,
        stateArray,
        setStateArray,
        stateObject,
        setStateObject,
        userState,
        setUserState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);