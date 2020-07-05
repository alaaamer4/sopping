const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/key");
const jwtSecret = config.jwtSecret;
const auth = require("../middleware/auth");
//@ /api/auth  POST
//@ access public
//@ chick if user and get token
router.post(
  "/",
  [
    check("email").notEmpty().withMessage("email is required"),
    check("password").notEmpty().withMessage("please enter your password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      // chick email
      let user = await User.findOne({ email });
      if (!email) {
        return res.status(404).json({
          success: false,
          err: "invalid credentials",
        });
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(404).json({
          success: false,
          err: "invalid credentials",
        });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          token: token,
        });
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err: "server error",
      });
    }
  }
);

//@ /api/auth  GET
//@ access private
//@ get logged in user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        err: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
});
module.exports = router;
