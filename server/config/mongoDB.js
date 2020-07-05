const mongoose = require("mongoose");
const config = require("./key");
const connect = config.mongoURI;

// connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(connect, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("connected to DB successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
