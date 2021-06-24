import axios from "axios";
import { REGISTER_USER, AUTH_USER, LOGIN_USER } from "./types";

export const loginUser = (data) => {
  const res = axios
    .post("https://pethooh1.herokuapp.com/api/user/signin", data, {
      withCredential: true,
    }) //  credentials: 'same-origin',
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return { type: LOGIN_USER, payload: res };
};

export const register = (data) => {
  const res = axios
    .post("https://pethooh1.herokuapp.com/api/user/register", data, {
      withCredential: true,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return { type: REGISTER_USER, payload: res };
};

export const auth = () => {
  const res = axios
    .get("https://pethooh1.herokuapp.com//api/user/auth", "", {
      withCredential: true,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return { type: AUTH_USER, payload: res };
};
