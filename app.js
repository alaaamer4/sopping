const express = require("express");
const app = express();
const connectDB = require("./server/config/mongoDB");
const user = require("./server/routes/user");
const auth = require("./server/routes/auth");
const cors = require("cors");
const products = require("./server/routes/products");

connectDB();
// to show in the ui
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use(express.static("server"));
app.use("server/uploads/", express.static("uploads"));
// body parser
app.use(cors());
app.use(express.json());

// routes
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/products/imageUpload", products);

// connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`connected to port ${PORT}`));
