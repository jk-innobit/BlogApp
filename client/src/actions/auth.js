import * as api from "../api/index.js";
import { parseJwt, setItem } from "../utils/index.js";

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    setItem(process.env.REACT_APP_USERDATA_KEY, data.token);
    const userData = parseJwt(data.token);
    dispatch({ type: "auth", data: userData, loggedIn: true });
  } catch (error) {
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
  }
};
export const signUp = (formData, setLogin) => async () => {
  try {
    await api.signUp(formData);
    setLogin(true);
  } catch (error) {
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
  }
};
export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: "auth", loggedIn: false });
  } catch (error) {
    console.log(error.message);
    const { response } = error;
    alert(response.data.message);
  }
};
