const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userDB = {
  "lule@dev.com": {
    password: "test",
    id: 12345
  }
};
const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/api` ,
  headers: {'Content-Type': 'application/json'},
});

axiosInstance.interceptors.response.use(
(response) => response,
(error) => error.response ? error.response : Promise.reject(error)
);

const cache = {}
const session = {}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', }));
app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

// app.post('/api/login', async(req, res, next) => {
//   try {
//     const { body: {email, password, signupVia='email'}, query: {src} } = req;
//     const response = await axiosInstance.post('/login', {email, password, signupVia})
    
//     if (response.status === 404) {
//       return res.status(response.status).json({success: false,  message: response.data.message});
//     }
//     session[userDB[email].id] = true;
//     if (!src) return res.status(200).json({})
//     const url = new URL(src);
//     const identifier = 123456
//     cache[identifier] = { id: userDB[email].id, origin: url.origin }
//     return res.status(200).json({ identifier })
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({success: false, message: 'An error occurred. Please try again.'})
//   }
// })

// app.get('/api/verify', (req,res,next)=>{
//   try {
//     const {token} = req.query;
//     const identifier = cache[token];
//     if(!identifier) return res.status(404).json({})
//     const id = identifier.id;
//     delete cache.identifier
//     return res.status(200).json({accessToken: id})
    
//   } catch (error) {
//     return next(error)
//   }
// })

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log('Server is running'));