const express = require("express");
const app = express(); // create express app
const path = require("path");
const bodyParser = require('body-parser');

const userDB = {
  "lule@dev.com": {
    password: "test"
  }
};

const cache = {}
const session = {}
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', }));
app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));
app.post('/api/login', (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(userDB[email] && password === userDB[email].password)) {
      return res.status(404).json({ message: "Invalid email and password" });
    }

    const { serviceURL } = req.query;
    const id = 12345
    req.user = id;
    session[id] = email;
    if (serviceURL === null) {
      return res.status(200).json({})
    }
    const url = new URL(serviceURL);
    const intrmid = 123456
    cache[intrmid] = { id, origin: url.origin }
    // return res.redirect(`${serviceURL}?ssoToken=${intrmid}`);
    return res.status(200).json({ intrmid })
  } catch (error) {
    console.log(error);
  }
})

app.get('/api/verify', (req,res,next)=>{
  try {
    const {token} = req.query;
    
    
  } catch (error) {
    return next(error)
  }
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});