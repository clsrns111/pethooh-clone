import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
function Hot() {
  const [select, setselect] = useState("dog");
  const [product, setproduct] = useState([]);
  const [best, setbest] = useState([]);

  useEffect(() => {
    if (select === "dog") {
      axios.post("/api/product/dogfood").then((res) => {
        let newdata = [];
        for (let i = 0; i < res.data.product.length; i++) {
          const { price } = res.data.product[i];
          let b = price.split("");
          b.splice(-3, 0, ",");
          const newprice = b.join("");

          newdata.push({ ...res.data.product[i], price: newprice });
        }
        setproduct(newdata);
      });
      axios.post("/api/product/dogproduct").then((res) => {
        let newdata = [];
        for (let i = 0; i < res.data.product.length; i++) {
          const { price } = res.data.product[i];
          let b = price.split("");
          b.splice(-3, 0, ",");
          const newprice = b.join("");

          newdata.push({ ...res.data.product[i], price: newprice });
        }
        setbest(newdata);
      });
    }
    if (select === "cat") {
      axios.post("/api/product/catfood").then((res) => {
        let newdata = [];
        for (let i = 0; i < res.data.product.length; i++) {
          const { price } = res.data.product[i];
          let b = price.split("");
          b.splice(-3, 0, ",");
          const newprice = b.join("");

          newdata.push({ ...res.data.product[i], price: newprice });
        }

        setproduct(newdata);
      });
      axios.post("/api/product/catproduct").then((res) => {
        let newdata = [];
        for (let i = 0; i < res.data.product.length; i++) {
          const { price } = res.data.product[i];
          let b = price.split("");
          b.splice(-3, 0, ",");
          const newprice = b.join("");

          newdata.push({ ...res.data.product[i], price: newprice });
        }
        setbest(newdata);
      });
    }
  }, [select]);

  const clickHandler = (e) => {
    let value = e.target.value;
    console.log(value);
    return setselect(value);
  };

  return (
    <div className="hot">
      <h2 className="title">우리 아이는?</h2>
      <div className="select">
        <div className="select-btn">
          <button
            value="dog"
            onClick={(e) => {
              clickHandler(e);
            }}
            className="dog-btn active"
          >
            강아지예요
          </button>
          <button
            value="cat"
            onClick={(e) => {
              clickHandler(e);
            }}
            className="cat-btn"
          >
            고양이예요
          </button>
        </div>
      </div>
      <hr className="hot-line" />
      <div className="pick">
        <h4 className="pick-title">펫후's PICK</h4>
        <section className="product-section">
          {product.map((el, idx) => {
            return (
              <div className="hot-product " key={idx}>
                <div className="img-container">
                  <Link to={`/detail/${el._id}`}>
                    <img
                      className="product-img"
                      src={`http://localhost:5000/${el.img}`}
                    ></img>
                  </Link>

                  <div className="hot-product-sub">
                    <p className="product-title">{el.product}</p>
                    <p className="hot-product-price">{el.price}원</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <div className="best">
        <h4 className="best-title">베스트 제품</h4>
        <section className="best-section">
          {best.map((el, idx) => {
            return (
              <div className="best-product">
                <Link to={`/detail/${el._id}`}>
                  <img
                    className="best-img"
                    src={`http://localhost:5000/${el.img}`}
                  />
                </Link>
                <div className="best-sub">
                  <h4 className="best-sub-title">{el.product}</h4>
                  <h4 className="best-sub-price">{el.price}원</h4>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Hot;
