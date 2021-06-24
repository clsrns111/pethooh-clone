import { REGISTER_USER, AUTH_USER, LOGIN_USER } from "./types";
import {} from "./types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
