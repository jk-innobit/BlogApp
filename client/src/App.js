import { useEffect, useState } from "react";
import { createContext } from "react";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
export const Context = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("profile") !== "undefined") {
      setLoggedIn(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Context.Provider value={{ setLoggedIn, loggedIn }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
