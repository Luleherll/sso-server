const express = require("express");
const app = express(); // create express app
const path = require("path");
const { ssoRedirect, isAuthenticated } = require("./middleware");
const cors = require('cors');
const cookieParser = require('cookie-parser')
app.use(cors());
app.use(cookieParser());

app.use(ssoRedirect);
app.use(isAuthenticated,express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));


app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(8000, () => {
  console.log("server started on port 5000");
});