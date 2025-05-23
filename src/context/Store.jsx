"use client";

import React, { createContext, useContext, useState } from "react";

import { FirebaseProvider } from "./FirbaseContext";
const GlobalContext = createContext({
  userLogged: false,
  setUserLogged: () => false,
  USER: { id: "", name: "", phone: "", email: "", gp: "", isAdmin: false },
  setUSER: () => {},
  stateArray: [],
  setStateArray: () => [],
  stateObject: {},
  setStateObject: () => {},
  userState: [],
  setUserState: () => [],
  slideState: [],
  setSlideState: () => [],
  userRequestState: [],
  setUserRequestState: () => [],
  userReqUpdTime: "",
  setUserReqUpdTime: () => "",
  unreadRequests: 0,
  setUnreadRequests: () => 0,
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
  const [slideState, setSlideState] = useState([]);
  const [userRequestState, setUserRequestState] = useState([]);
  const [userReqUpdTime, setUserReqUpdTime] = useState(Date.now() - 1000);
  const [unreadRequests, setUnreadRequests] = useState(0);
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
        slideState,
        setSlideState,
        userRequestState,
        setUserRequestState,
        userReqUpdTime,
        setUserReqUpdTime,
        unreadRequests,
        setUnreadRequests,
      }}
    >
      <FirebaseProvider>{children}</FirebaseProvider>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
