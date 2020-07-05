import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/alert";

const Upload = ({ setAlert, uploadImages }) => {
  const [images, setImages] = useState([]);

  const handleClick = (e) => {
    document.getElementById("fileUpload").click();
  };
  const handelChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0]);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("/api/products/imageUpload", formData, config)
      .then((res) => {
        if (res.data.success) {
          setImages([...images, res.data.image]);
          uploadImages([...images, res.data.image]);
          setAlert("image uploaded successfully", "success");
          console.log(images);
        }
      })
      .catch((err) => {
        setAlert("server error", "danger");
        console.log(err);
      });

    console.log(images);
  };

  return (
    <div className="wrapper">
      <div>
        <button className="btn btn-light drag" onClick={handleClick}>
          <i className="fas fa-plus fa-4x text-primary"></i>
        </button>
        <input
          type="file"
          onChange={handelChange}
          multiple={false}
          id="fileUpload"
          name="file"
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapActionsToPros = {
  setAlert,
};
export default connect(null, mapActionsToPros)(Upload);
