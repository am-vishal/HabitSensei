const express = require("express");
const port = 8000;
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const routes = require("./routes");

//serve static files
//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
//use cors module
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up routes
app.use("/", routes);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
//listen to server
app.listen(port, () => console.log(`Server started on port ${port}`));
