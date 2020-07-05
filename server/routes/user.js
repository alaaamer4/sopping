const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const config = require("../config/key");
const jwtSecret = config.jwtSecret;
const jwt = require("jsonwebtoken");

//@ route /api/user    POST
//@ access public
//@ chick if user exists and  register user

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("name must be 5 or more chars"),
    check("email").isEmail().withMessage("please enter valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, name, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          err: "user already exists",
        });
      }

      user = new User({ email, name, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
      console.log(err.message);
      res.status(500).json({
        success: false,
        err: "server error ",
      });
    }
  }
);

module.exports = router;
