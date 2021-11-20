const fs = require("fs");
const models = require("../models");
require("dotenv").config();

module.exports = {
  createComment: (req, res, next) => { //create comment
    const userId = req.params.id;
    const postId = req.params.idPost;
    const { content } = req.body;
    models.Comment.create({
      content: content,
      idUSERS: userId,
      idPOSTS: postId,
    })
      .then((comment) => {
        res.status(201).json({ content: comment });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  getAllComments: (req, res, next) => { //get all comments
    models.Comment.findAll({
      attributes: ["id", "content", "idUSERS", "idPOSTS"],
    })
      .then((commentsFound) => {
        if (commentsFound) {
          res.status(200).json({ comments: commentsFound });
        } else {
          res.status(404).json({ message: "No comments found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  //getOneComment: (req, res, next) => {}, //TODO
  updateComment: (req, res, next) => { // updateComment
    const commentId = req.params.idComment;
    const { content } = req.body;
    models.Comment.update(
      {
        content: content,
      },
      {
        where: { id: commentId },
      }
    )
      .then((commentUpdated) => {
        if (commentUpdated) {
          res.status(200).json({ message: "Comment updated" });
        } else {
          res.status(404).json({ message: "Comment not found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  deleteComment: (req, res, next) => { //deleteComment
    const commentId = req.params.idComment;
    models.Comment.destroy({
      where: { id: commentId },
    })
      .then((commentDeleted) => {
        if (commentDeleted) {
          res.status(200).json({ message: "Comment deleted" });
        } else {
          res.status(404).json({ message: "Comment not found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
};
