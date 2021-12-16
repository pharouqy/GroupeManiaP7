const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ error: "Requires token" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    models.User.findOne({
      attributes: ["id"],
      where: { id: decodedToken.id },
    }).then((userFound) => {
      if (userFound) {
        if (!decodedToken) {
          res.status(401).json({
            message: "Token invalid",
          });
        } else if (userFound.id == decodedToken.id || decodedToken.isAdmin === true) {
          next();
        } else {
          res.status(403).json({
            message: "Forbidden",
          });
        }
      } else {
        return res.status(403).json({ error: "User not found" });
      }
    });
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};
