import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function Basket() {
  const [product, setproduct] = useState([]);
  const [productQty, setproductQty] = useState();

  const itemDelete = (id) => {
    axios.post(`/api/product/deleteitem`, id).then((res) => console.log(res));
  };

  const changeHandler = (id) => {
    axios.post(`/api/basket/qty`, id).then((res) => console.log(res));
  };

  useEffect(() => {
    const getItem = () => {
      axios.post(`/api/product/cartItem`).then((res) => {
        setproduct(res.data);
      });
    };
    getItem();
  }, [product]);

  if (!product.length) {
    return (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <section className="basket">
      <small className="home-product">
        <Link to="/">Home</Link> <IoIosArrowForward /> <Link to="">Basket</Link>
      </small>
      <nav className="basket-nav">
        <small>이미지</small>
        <small className="basket-title">상품정보</small>
        <small>판매가</small>
        <small>수량</small>
        <small>합계</small>
        <small>선택</small>
      </nav>
      <div className="basket-contents">
        {product.length <= 0 ? (
          <h1 className="텅">장바구니가 비었습니다.</h1>
        ) : (
          product.map((el, idx) => {
            return (
              <div key={idx} className="basket-content">
                <img src={`http://localhost:5000/${el.img}`}></img>
                <small>{el.title}</small>
                <small className="basket-price">{el.price}</small>
                <small className="basket-totalprice">{el.price * el.qty}</small>
                <container className="container">
                  <input
                    min="1"
                    max="20"
                    className="basket-content-qty"
                    type="number"
                    value={el.qty}
                    onChange={() => {
                      changeHandler(el.id);
                    }}
                  />
                </container>
                <AiOutlineClose
                  className="basket-content-xbtn"
                  onClick={() => {
                    itemDelete(el.id);
                  }}
                />
                <div className="underline"></div>
              </div>
            );
          })
        )}
      </div>
      <div className="basket-total">
        <h4>총 결제 금액:</h4>
        <div className="totalprice">
          {!product
            ? "0원"
            : product
                .map((el) => +el.price * el.qty)
                .reduce((acc, calc) => acc + calc)}
          원
        </div>
      </div>
    </section>
  );
}

export default Basket;
