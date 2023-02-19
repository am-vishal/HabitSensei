const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
// The url is stored in an environment variable and is retrieved from process.env
mongoose.connect(`${process.env.MONGODB_URL}`, () => {
  // After a successful connection, log a message to the console to indicate a successful connection to MongoDB.
  console.log("Connected to MongoDB");
});
