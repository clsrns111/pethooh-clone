import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { register } from "../user_action";

import { withRouter } from "react-router-dom";
function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const submitHanlder = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return alert("패스워드가 다릅니다.");
    } else {
      const data = { name, email, password };
      dispatch(register(data)).then((res) => {
        if (res.payload.success) {
          history.push("/signin");
        }
      });
      setname("");
      setemail("");
      setpassword("");
      setpassword2("");
    }
  };

  return (
    <section className="register-section">
      <form className="register-form" onSubmit={(e) => submitHanlder(e)}>
        <h2 className="title">회원가입</h2>
        <label>이름</label>
        <input
          className="input"
          required
          min="1"
          max="4"
          onChange={(e) => {
            setname(e.target.value);
          }}
          type="text"
        ></input>
        <label>이메일주소</label>
        <input
          className="input"
          required
          onChange={(e) => {
            setemail(e.target.value);
          }}
          type="email"
        ></input>
        <label>비밀번호</label>
        <input
          className="input"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          type="password"
        ></input>
        <label>비밀번호 확인</label>
        <input
          className="input"
          required
          onChange={(e) => {
            setpassword2(e.target.value);
          }}
          type="password"
        ></input>
        <button type="submit" className="btn">
          회원가입
        </button>
      </form>
    </section>
  );
}

export default withRouter(Register);
