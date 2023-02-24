import { useEffect, useState } from "react";
import { createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

export const Context = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(loggedIn);
    if (localStorage.getItem("profile")) {
      const token = parseJwt(JSON.parse(localStorage.getItem("profile")).token);
      token.exp * 1000 < Date.now() ? setLoggedIn(false) : setLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <Context.Provider value={{ setLoggedIn, loggedIn }}>
        <Routes>
          <Route
            exact
            path="/*"
            element={!loggedIn ? <Navigate to="/auth" /> : <Home />}
          />
          <Route
            exact
            path="/auth"
            element={loggedIn ? <Navigate to="/" /> : <Auth />}
          />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
