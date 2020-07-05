const express = require("express");
const app = express();
const connectDB = require("./server/config/mongoDB");
const user = require("./server/routes/user");
const auth = require("./server/routes/auth");
const products = require("./server/routes/products");

connectDB();
// static folder
app.use("/uploads", express.static("uploads"));
app.use(express.static("client/uploads"));
// body parser
app.use(express.json());

// routes
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/products/imageUpload", products);

// connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected to port ${PORT}`));
