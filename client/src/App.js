import { useEffect, useState } from "react";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

export const Context = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      setLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <Context.Provider value={{ setLoggedIn, loggedIn }}>
        <Routes>
          <Route exact path="/*" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
