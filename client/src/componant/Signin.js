import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../user_action";
import { withRouter } from "react-router-dom";

function Signin({}) {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [token, settoken] = useState("");

  const dispatch = useDispatch();

  if (token) {
    return history.push("/");
  }

  const submitHanlder = async (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(loginUser(data)).then((res) => {
      if (res.payload.loginSuccess) {
        history.push({
          pathname: "/",
          state: { data: res.payload.loginSuccess },
        });
        window.location.reload();
      }
    });
  };

  return (
    <section className="login-section">
      <form
        className="login-form"
        onSubmit={(e) => {
          submitHanlder(e);
        }}
      >
        <h2 className="title">회원 로그인</h2>
        <label>이메일</label>
        <input
          className="input"
          type="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
        <label>비밀번호</label>
        <input
          className="input"
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
        <button className="btn" type="submit">
          로그인
        </button>
      </form>
    </section>
  );
}

export default withRouter(Signin);
