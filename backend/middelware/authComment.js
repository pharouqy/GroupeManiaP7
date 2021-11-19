const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const userId = req.params.id;
  const postId = req.params.idPost;
  const commentId = req.params.idComment;
  models.Comment.findOne({
      attributes: ["id" , "idUSERS" , "idPOSTS" , "content"],
    where: {
      id: commentId,
    },
  }).then((comment) => {
    if (comment.idUSERS == userId && comment.idPOSTS == postId) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  });
};
