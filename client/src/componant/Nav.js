import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Upload from "./Upload";
import { FcUpload } from "react-icons/fc";
import withRouter from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import axios from "axios";
import { Redirect } from "react-router-dom";
import GlobalSpinnerContextProvider from "../global";

function Nav(props) {
  const { Auth } = GlobalSpinnerContextProvider();

  const history = useHistory();
  const [isSubmit, setisSubmit] = useState(false);
  const [container, setContainer] = useState(null);
  const [isAuth, setisAuth] = useState(false);
  const [word, setword] = useState("");
  const [name, setname] = useState("");
  const [skip, setskip] = useState(0);
  const [limit, setlimit] = useState("");
  const [postsize, setpostsize] = useState();
  const [filter, setfilter] = useState({
    price: [],
    category: [],
  });

  const openMyWindow = (url) => {
    window.open(url, "_blank").focus();
  };

  const getItem = (variables) => {
    axios.post(`/api/product/cartItem`, variables).then((res) => {
      history.push({
        pathname: "/search",
        state: { data: res.data.products },
      });
    });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    /*  const variables = {
      skip: 0,
      limit,
      filter,
      word,
    }; */
    getItem(word);
  };

  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      setisAuth(res.data.isAuth);
      setname(res.data.name);
    });
  }, [isAuth, name]);

  const logoutHandler = () => {
    axios.get("/api/user/logout").then((res) => console.log(res));
    setisAuth(false);
    history.push("/");
  };

  return (
    <div className="nav">
      <div className="top">
        <div className="sub">
          {isAuth ? (
            <>
              <RiShoppingBasketLine
                onClick={() => {
                  history.push("/basket");
                }}
                className="basket-icon"
              />
              <div className="welecom">
                <small>안녕하세요 </small>
                <span className="name"> {name}</span>
                <small>님</small>
              </div>

              <button className="logout" onClick={logoutHandler}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => {
                  history.push("/signin");
                }}
                className="login"
              >
                로그인
              </button>
              <button
                onClick={() => {
                  history.push("/register");
                }}
                className="register"
              >
                회원가입
              </button>
            </>
          )}
        </div>
        <Link to="/">
          <img
            className="logo"
            src="https://pethooh.com/img/img_logo.png"
          ></img>
        </Link>
        <form
          onSubmit={(e) => {
            changeHandler(e);
          }}
          class="search-form"
        >
          <input
            placeholder="검색어를 입력해 주세요."
            className="input"
            value={word}
            onChange={(e) => {
              setword(e.target.value);
            }}
          ></input>
          <IoSearchOutline className="search-icon" />
        </form>
      </div>
      <hr className="underline1" />
      <div className="bottom">
        <Link className="link" to="/category/dogfood">
          DOG FOOD
        </Link>
        <Link className="link" to="/category/dogproduct">
          DOG PRODUCT
        </Link>
        <Link className="link" to="/category/catfood">
          CAT FOOD
        </Link>
        <Link className="link" to="/category/catproduct">
          CAT PRODUCT
        </Link>

        <FaFacebookF
          className="nav-icon"
          onClick={() => {
            openMyWindow("https://www.facebook.com/pethooh");
          }}
        />
        <FaInstagram
          className="nav-icon"
          onClick={() => {
            openMyWindow("https://www.instagram.com/pethooh");
          }}
        />
      </div>
      <hr className="underline2" />
    </div>
  );
}

export default Nav;
