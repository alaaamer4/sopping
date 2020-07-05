import React, { useState } from "react";
import Upload from "../util/Upload";
const UploadFiles = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
  });
  const [images, setImages] = useState([]);
  const { title, description, price, area } = input;

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    console.log(images);
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const updateImages = (images) => {
    setImages(images);
  };
  return (
    <section style={{ marginTop: "8rem" }}>
      <h2 className="large text-primary">
        {" "}
        <i className="fas fa-upload"></i> Add product
      </h2>
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
        <div className="form-group">
          <select name="area" onChange={handelChange} value={area}>
            <option value="0">* Select Your Area</option>
            <option value="Cairo">Cairo</option>
            <option value="Alex">Alex</option>
            <option value="Port-said">Port-said</option>
            <option value="Ismailia">Ismailia</option>
            <option value="Aswan">Aswan </option>
            <option value="Sharqia">Sharqia </option>
            <option value="Gharbia">Gharbia</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Item
        </button>
      </form>
    </section>
  );
};

export default UploadFiles;
