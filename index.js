const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const indexRoutes = require("./routes/index");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/assets"));
app.use(express.static("/assets"));

// Set up routes
app.use("/", indexRoutes);

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
