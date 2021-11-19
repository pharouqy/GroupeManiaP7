const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const userId = req.params.id;
  const headerAuth = req.headers["authorization"];
  if (headerAuth) {
    const token = headerAuth.replace("Bearer ", "");
    if (!token) {
      res.clearCookie();
      res.status(401).json({
        message: "Token not provided",
      });
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      if (!decoded) {
        res.clearCookie();
        res.status(401).json({
          message: "Token invalid",
        });
      } else if (decoded.id == userId || decoded.isAdmin == true) {
        //token valid
        next();
      } else {
        res.clearCookie();
        res.status(403).json({
          message: "Unauthorized",
        });
      }
    }
  }
};
