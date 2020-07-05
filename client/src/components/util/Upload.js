import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/alert";

const Upload = ({ setAlert }) => {
  const [images, setImages] = useState([]);

  const handleClick = (e) => {
    document.getElementById("fileUpload").click();
  };
  const handelChange = (e) => {
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    console.log(e.target.files[0]);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("/api/products/imageUpload", formData, config)
      .then((res) => {
        if (res.data.success) {
          setImages([...images, res.data.images]);
          console.log(images);
        } else {
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
          <i className="fas fa-upload fa-4x"></i>
        </button>
        <input
          type="file"
          onChange={handelChange}
          id="fileUpload"
          name="images"
        />
      </div>
      <div className="drag">
        <img src="" />
      </div>
    </div>
  );
};

const mapActionsToPros = {
  setAlert,
};
export default connect(null, mapActionsToPros)(Upload);
