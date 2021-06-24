import axios from "axios";
import React, { useState } from "react";
import ImgUpload from "./utils/ImgUpload";

function Upload(props) {
  const [product, setproduct] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState(0);
  const [img, setimg] = useState([]);
  const [category, setcategory] = useState("dog-food");

  const updateImages = (newImg) => {
    console.log(newImg);
    setimg(newImg);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { product, desc, price, img, category };
    axios.post("/api/product/uploadProduct", data).then((res) => {
      if (res.data.success) {
        alert("upload success");
      } else {
        alert("failed to upload");
      }
    });
  };

  return (
    <section className="upload-section">
      <h2 className="title">제품 업로드(어드민 전용)</h2>
      <form onSubmit className="upload-form">
        <ImgUpload refreshFunction={updateImages} />
        <label>상품명</label>
        <input
          onChange={(e) => {
            setproduct(e.target.value);
          }}
          value={product}
          className="input"
        />
        <label>설명란</label>
        <input
          onChange={(e) => {
            setdesc(e.target.value);
          }}
          value={desc}
          className="input"
        />
        <label>가격</label>
        <input
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
          type="number"
          className="input"
        />
        카테고리
        <select
          className="category"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          <option value="dog-food">DOG FOOD</option>
          <option value="dog-product">DOG PRODUCT</option>
          <option value="cat-food">CAT FOOD</option>
          <option value="cat-product">CAT PRODUCT</option>
        </select>
        <button className="btn" onClick={submitHandler}>
          등록
        </button>
      </form>
    </section>
  );
}

export default Upload;
