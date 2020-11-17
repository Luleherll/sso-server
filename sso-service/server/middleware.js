const url = require("url");
const axios = require("axios");
const { URL } = url;
const ssoServerJWTURL = "http://localhost:5000";

exports.ssoRedirect = async(req, res, next)=> {
    const { ssoToken } = req.query;
    if (ssoToken) {
      const redirectURL = url.parse(req.url).pathname;
      try {
        const response = await axios.get(`${ssoServerJWTURL}/api/verify?token=${ssoToken}`);
        // console.log(response);
        res.cookie('hog', 12345, {maxAge: 1000 * 60 * 2880, httpOnly: true})

        // req.user = ;
      } catch (err) {
        return next(err);
      }

      return res.redirect(`${redirectURL}`);
    }

    return next();
  };


exports.isAuthenticated = (req, res, next) => {
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
    console.log('kkf',req.cookies);
    if (!req.cookies.hog) {
      return res.redirect(
        `http://localhost:5000/login?serviceURL=${redirectURL}`
      );
    }
    next();
  };
