import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import GlobalSpinnerContextProvider from "../global";
import { useDispatch } from "react-redux";
import { auth } from "../user_action";
function Detail(props) {
  const { Auth } = GlobalSpinnerContextProvider();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const [product, setproduct] = useState([]);
  const [price, setprice] = useState();
  const [total, settotal] = useState(1);
  const [detailProduct, setdetailProduct] = useState([]);
  const [isAuth, setisAtuh] = useState(false);
  const initprice = +product.price;

  axios.post("/api/product/detail", id).then((res) => {
    setproduct(res.data.product);

    if (!price) {
      setprice(+res.data.product.price);
    }
    /*  const { price } = res.data.product;
    let b = price.split("");
    if (b.length >= 5) {
      b.splice(2, 0, ",");
    }
    const newprice = b.join("");
    setproduct({ ...res.data.product, price: newprice }); */
  });

  const getItem = () => {
    axios
      .post(`/api/product/cartItem`)
      .then((res) => setdetailProduct(res.data));
  };

  const addItem = () => {
    const info = {
      img: product.img,
      productId: id,
      price,
      total,
      initprice,
      title: product.product,
    };

    axios
      .post(`/api/product/addProduct?productId=${id}`, info)
      .then((res) => setdetailProduct(res.data));
  };

  const submitHandler = () => {
    if (!isAuth) {
      alert("로그인이 필요합니다.");
      return setTimeout(() => {
        history.push("/signin");
      }, 1000);
    }
    addItem();
    getItem();
  };

  useEffect(() => {
    dispatch(auth()).then((res) => setisAtuh(res.payload.isAuth));
    if (isAuth) getItem();
    setprice(initprice * total);
  }, [total, product.product, detailProduct]);

  const modal = document.querySelector(".square");

  const closeHandler = (e) => {
    modal.style.visibility = "hidden";
  };

  const popupHandler = () => {
    if (isAuth) modal.style.visibility = "visible";
  };

  const itemDelete = (id) => {
    axios.post(`/api/product/deleteitem`, id).then((res) => console.log(res));
  };

  if (product.length <= 0) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <section className="detail-section">
      <small className="home">
        <Link to="/">Home</Link> <IoIosArrowForward /> <Link to="">Detail</Link>
      </small>
      <h4 className="home-idx">Product-detail</h4>
      <div className="detail-img-container">
        <img
          className="detail-img"
          src={`http://localhost:5000/${product.img}`}
        ></img>
      </div>
      <div className="detail-sub">
        <h1 className="detail-title">{product.product}</h1>
        <h3 className="detail-price">{product.price}원</h3>
        <hr className="underline1" />
        <div className="row">
          <div className="detail-desc">
            <small>용도: {product.category}</small>
            <small>연령: 전연령</small>
            <small>
              배송안내: 오후 4시 이전 주문하면 오늘 출발/영업일 기준{" "}
            </small>
            <small>배송비: 2,500원 (19,800원 이상 구매 시 무료)</small>
          </div>
        </div>
        <div className="detail-bottom">
          <small className="detail-bottom-title">상품명</small>
          <small>상품수</small>
          <small>가격</small>
        </div>
        <div className="detail-bottom2">
          <small className="detail-bottom-title2">{product.product}</small>
          <input
            onChange={(e) => {
              settotal(e.target.value);
            }}
            value={total}
            min="1"
            max="20"
            type="number"
          ></input>
          <small className="price">{price}</small>
        </div>
        <Link to="/"></Link>
        <button
          type="submit"
          onClick={() => {
            popupHandler();
            submitHandler();
          }}
          className="detail-btn"
        >
          장바구니에 담기
        </button>
        {
          <div className="square active">
            <div className="border">
              <small>장바구니담기</small>
              <AiOutlineClose
                onClick={() => {
                  closeHandler();
                }}
                className="icon"
              />
            </div>
            <div display={{ fontWeight: "400" }} className="contents">
              <small>
                총 상품수{" "}
                <span style={{ fontWeight: "600" }}>
                  {detailProduct.length}
                </span>
                개
              </small>
              <div className="menu">
                <small className="menu-title">상품명</small>
                <small className="qty">수량</small>
                <small className="price">가격</small>
              </div>
              <hr className="underline1"></hr>
              <div className="product-contents">
                {detailProduct.map((el, idx) => {
                  return (
                    <div className="content" key={idx}>
                      <small>{el.title}</small>
                      <small className="content-qty">{el.qty}</small>
                      <small className="content-price">{el.price}</small>
                      <AiOutlineClose
                        className="xbtn"
                        onClick={() => {
                          itemDelete(el.id);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={async () => {
                  history.push("/basket");
                }}
                className="moveToBasket"
              >
                장바구니로 이동
              </button>
              <button
                onClick={async () => {
                  history.goBack();
                }}
                className="keep"
              >
                쇼핑 계속하기
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  );
}

export default Detail;
