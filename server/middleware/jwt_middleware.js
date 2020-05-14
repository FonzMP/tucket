const jwt = require('jsonwebtoken'),
  bodyParser = require('body-parser');

let validateToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.jwt_secret, (err, decodeToken) => {
      if (err) {
        return res.json({
          success: false
        })
      } else {
        req.decoded = decodeToken;
        next();
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'Auth token not found.'
    })
  }
}

module.exports = {
  validateToken: validateToken
}