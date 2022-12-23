export const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case "auth":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case "signOut":
      localStorage.clear();
      return { ...state, authData: action?.data };

    default:
      return state;
  }
};
