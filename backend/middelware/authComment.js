const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const commentId = req.params.idComment;
  models.Comment.findOne({
      attributes: ["id" , "idUSERS" , "idPOSTS" , "content"],
    where: {
      id: commentId,
    },
  }).then((commentsFound) => {
    if (commentsFound.idUSERS && commentsFound.idPOSTS == postId) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  });
};
