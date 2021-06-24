import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
function DogFood() {
  const [product, setproduct] = useState([]);
  useEffect(() => {
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
  }, []);

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
    <section className="product-section">
      <small className="home-product">
        <Link to="/">Home</Link> <IoIosArrowForward />{" "}
        <Link to="/category/dogfood">DogFood</Link>
      </small>

      <h4 className="idx">Dog Food</h4>

      {product.map((el, idx) => {
        return (
          <div className="product" key={idx}>
            <div className="img-container">
              <Link to={`/detail/${el._id}`}>
                <img
                  className="product-img"
                  src={`http://localhost:5000/${el.img}`}
                ></img>
              </Link>

              <div className="product-sub">
                <p className="product-title">{el.product}</p>
                <p className="product-price">{el.price}원</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default DogFood;
