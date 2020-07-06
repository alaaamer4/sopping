import React, { useState } from "react";
import axios from "axios";
import Upload from "../util/Upload";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/alert";
const UploadFiles = ({ setAlert }) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const { title, description, price } = input;

  const handelSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "Application/Json" },
    };
    const productInfo = JSON.stringify({ title, description, price, images });
    axios
      .post("/api/products/uploadProduct", productInfo, config)
      .then((res) => {
        if (res.data.success) {
          setAlert("product uploaded successfully", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert("server error", "danger");
      });
    setImages([]);
    setInput({
      title: "",
      description: "",
      price: "",
    });
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const updateImages = (images) => {
    setImages(images);
  };
  return (
    <section style={{ marginTop: "3.6rem" }}>
      <h1>
        {" "}
        <i className="fas fa-upload text-primary"></i> Add product
      </h1>
      <Upload uploadImages={updateImages} />
      <form className="form" onSubmit={handelSubmit}>
        <div className="form-group">
          <input
            type="text"
            required
            value={title}
            name="title"
            placeholder="Title"
            onChange={handelChange}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            required
            value={description}
            name="description"
            placeholder="Description"
            onChange={handelChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="number"
            required
            value={price}
            name="price"
            placeholder="price"
            onChange={handelChange}
            autoComplete="off"
          />
        </div>

        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Item
        </button>
      </form>
    </section>
  );
};

const mapActionsToPros = {
  setAlert,
};
export default connect(null, mapActionsToPros)(UploadFiles);
