import axios from "axios";
import React, { useState } from "react";
import DropZone from "react-dropzone";
import { FaPlus } from "react-icons/fa";

function ImgUpload(props) {
  const [img, setimg] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/uploadImage", formData, config).then((res) => {
      if (res.data.success) {
        setimg([...img, res.data.image]);
        props.refreshFunction([...img, res.data.image]);
      } else {
        alert("failed to save the image");
      }
    });
  };

  const onDelete = (image) => {
    const newImages = img.filter((el, idx) => image !== el);
    setimg(newImages);
  };

  return (
    <div className="drop-container">
      <DropZone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div className="drop-zone" {...getRootProps()}>
            <input className="drop-input" {...getInputProps()} />
            <FaPlus className="plus-icon" />
            <small>이미지업로드</small>
          </div>
        )}
      </DropZone>
      <div
        style={{
          display: "flex",
          heigth: "300px",
          width: "300px",
          overflow: "scroll",
        }}
      >
        {img.map((el, idx) => {
          return (
            <div
              onClick={() => {
                onDelete(el);
              }}
            >
              <img
                className="drop-img"
                src={`http://localhost:5000/${el}`}
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImgUpload;
