const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Products = mongoose.model("Products", userSchema);

module.exports = { Products };
