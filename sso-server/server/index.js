const express = require("express");
const app = express(); // create express app
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userDB = {
  "lule@dev.com": {
    password: "test",
    id: 12345
  }
};

const cache = {}
const session = {}
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.post('/api/login', (req, res, next) => {
  try {
    const { body: {email, password}, query: {src} } = req;
    if (!(userDB[email] && password === userDB[email].password)) {
      return res.status(404).json({ message: "Invalid email and password" });
    }
    session[userDB[email].id] = true;
    if (!src) return res.status(200).json({})
    const url = new URL(src);
    const identifier = 123456
    cache[identifier] = { id: userDB[email].id, origin: url.origin }
    return res.status(200).json({ identifier })
  } catch (error) {
    console.log(error);
  }
})

app.get('/api/verify', (req,res,next)=>{
  try {
    const {token} = req.query;
    const identifier = cache[token];
    console.log(identifier);
    if(!identifier) return res.status(404).json({})
    const id = identifier.id;
    delete cache.identifier
    return res.status(200).json({accessToken: id})
    
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