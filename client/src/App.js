import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  const user = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route exact path="/*" element={user.loggedIn ? <Home /> : <Auth />} />
    </Routes>
  );
}

export default App;
