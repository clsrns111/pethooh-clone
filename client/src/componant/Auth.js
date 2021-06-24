import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../user_action";
import useGlobalContext from "../global";
import { useSelector } from "react-redux";
export default function (Component, option, adminRoute = null) {
  function AuthCheck(props) {
    const dispatch = useDispatch();
    // null => 아무나 출입
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능

    React.useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <Component />;
  }

  return AuthCheck;
}
