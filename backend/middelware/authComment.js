const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decoded.id;
  const commentId = req.params.idComment;
  models.Comment.findOne({
      attributes: ["id" , "idUSERS" , "idPOSTS" , "content"],
    where: {
      id: commentId,
    },
  }).then((commentsFound) => {
    if (commentsFound.idUSERS == userId && commentsFound.id == commentId) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  });
};
