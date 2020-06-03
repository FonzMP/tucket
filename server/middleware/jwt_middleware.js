const jwt = require("jsonwebtoken"),
  bodyParser = require("body-parser");

validateToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.jwt_secret, (err, decodeToken) => {
      if (err) {
        return res.json({
          success: false,
        });
      } else {
        req.decoded = decodeToken;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token not found.",
    });
  }
};

returnUsername = () => {
  console.log('validating user')
  jwt.decode(token);
};

module.exports = {
  validateToken,
  returnUsername,
};
