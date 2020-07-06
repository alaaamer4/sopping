const express = require("express");
const router = express.Router();
const { Products } = require("../models/Products");
const auth = require("../middleware/auth");
// multer setup for file upload
const path = require("path");
const multer = require("multer");
// set the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000000000000000000 },
}).single("file");

//@ Route api/products/imageUpload
//@ Method   POST
//@ Upload image
router.post("/imageUpload", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: false, err: `server error ${err}` });
    } else {
      res.status(200).json({
        success: true,
        image: res.req.file.path,
        filename: res.req.file.filename,
      });
    }
  });
});

//@ Route api/products/uploadProduct
//@ Method   POST
//@ Add product to database
router.post("/uploadProduct", auth, async (req, res) => {
  try {
    const { title, description, price, images } = req.body;
    let productInfo = {};
    productInfo.user = req.user.id;
    if (title) productInfo.title = title;
    if (description) productInfo.description = description;
    if (price) productInfo.price = price;
    if (images) productInfo.images = images;
    // create product
    const product = new Products(productInfo);
    await product.save();
    res.status(200).json({
      success: true,
      msg: "product added to Database",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err: "server error" });
  }
});
module.exports = router;
