const url = require("url");
const axios = require("axios");
const { URL } = url;
const ssoServerJWTURL = "http://localhost:5000";

exports.ssoRedirect = async(req, res, next)=> {
    const { sso } = req.query;
    console.log(sso);
    if (sso) {
      const redirectURL = url.parse(req.url).pathname;
      try {
        const response = await axios.get(`${ssoServerJWTURL}/api/verify?token=${sso}`);
        const {accessToken}=response.data;
        res.cookie('xMwHog', accessToken, {maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true})
      } catch (err) {
        console.log(err);
        if(err.response.status === 404) return res.redirect(`http://localhost:5000/login?src=${`${req.protocol}://${req.headers.host}${req.path}`}`);
        return next();
      }
      return res.redirect(redirectURL);
    }

    return next();
  };


exports.isAuthenticated = (req, res, next) => {
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
    const localToken = req.cookies.xMwHog;

    if (!localToken) {
      return res.redirect(`http://localhost:5000/login?src=${redirectURL}`);
    }
    next();
  };
