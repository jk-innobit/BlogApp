export const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token?.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const getItem = (item) => {
  const data = localStorage.getItem(window.btoa(item));
  if (data === null || data === undefined) return "";
  return window.atob(data);
};

export const setItem = (item, value) => {
  localStorage.setItem(window.btoa(item), window.btoa(value));
};

export const getEncryptedValue = (value) => {
  const encryptValue = window.btoa(value);
  return encryptValue;
};

export const getInitialState = () => {
  const initialState = { authData: null, loggedIn: false };
  let token = getItem(process.env.REACT_APP_USERDATA_KEY);
  if (token !== "") {
    let userData = parseJwt(token);
    initialState.authData = userData;
    initialState.loggedIn = true;
    return initialState;
  }
  return initialState;
};
