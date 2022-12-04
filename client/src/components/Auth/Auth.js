import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      {login ? <SignIn setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}
    </>
  );
};

export default Auth;
