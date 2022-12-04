import { useState } from "react";
import { createContext } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
export const Context = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userInfo = localStorage.getItem("profile");
  // console.log(userInfo);

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{ setLoggedIn, loggedIn }}>
          <Routes>
            <Route
              exact
              path="/"
              element={userInfo ? <Home /> : <Navigate to="/auth" />}
            />
            <Route exact path="/auth" element={<Auth />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
