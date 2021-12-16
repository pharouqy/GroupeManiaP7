const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  const id = req.params.id;
  models.User.findOne({
    attributes: ["id"],
    where: { id: id },
  })
    .then((userFound) => {
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      if (userFound) {
        if (!userFound) {
          res.status(401).json({
            message: "User not found",
          });
        } else if (id == decodedToken.id || decodedToken.isAdmin === true) {
          next();
        }
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: error });
    });
};
