import { getInitialState } from "../utils";

const initialState = getInitialState();
export const auth = (state = initialState, action) => {
  if (action.type === "auth") {
    if (!action.loggedIn) {
      localStorage.clear();
    }
    return { ...state, authData: action?.data, loggedIn: action?.loggedIn };
  }
  return state;
};
