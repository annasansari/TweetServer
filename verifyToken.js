const jwt = require("jsonwebtoken");
const { handleError } = require("./error.js");


const JWT = "E$%XCRT&b8yCrt7bY*"
module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(handleError(401, "You are not authenticated"));

  jwt.verify(token, JWT, (err, user) => {
    if (err) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};
