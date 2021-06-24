import axios from "axios";
import React, { useHistory, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
function Search(props) {
  const location = useLocation();

  const [product, setproduct] = useState([]);
  let data = location.state.data;

  useEffect(() => {
    setproduct(data);
  }, [product, data]);

  return (
    <section className="product-section">
      <small className="home-product">
        <Link to="/">Home</Link> <IoIosArrowForward /> <Link>Search</Link>
      </small>
      <h4 className="idx">Search</h4>
      {product.map((el, idx) => {
        return (
          <div onClick={() => {}} className="product" key={idx}>
            <div className="img-container">
              <Link to={`/detail/${el._id}`}>
                <img
                  className="product-img"
                  src={`http://localhost:5000/${el.img}`}
                ></img>
              </Link>
            </div>
            <div className="product-sub">
              <p className="product-title">{el.product}</p>
              <p className="product-price">{el.price}원</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Search;
