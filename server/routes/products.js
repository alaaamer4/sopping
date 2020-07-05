const express = require("express");
const router = express.Router();
// multer setup for file upload
const path = require("path");
const multer = require("multer");
// set the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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
router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ success: false, err: err });
    } else {
      if (req.files === undefined) {
        console.log(req);
        res.status(400).json({
          success: false,
          err: "no image was selected",
        });
      } else {
        res.status(200).json({
          success: true,
          images: `/uploads/${req.files.filename}`,
          filename: req.files.filename,
        });
      }
    }
  });
});

module.exports = router;
