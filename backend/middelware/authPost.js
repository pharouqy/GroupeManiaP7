const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
    const userId = req.params.id;
    const postId = req.params.idPost;
    models.Post.findOne({
      attributes: [ "id", "idUSERS" ], 
      where: {
        id: postId,
      },
    }).then((post) => {
      if (post.idUSERS == userId) {
        next();
      } else {
        res.status(401).json({
          message: "You are not authorized to delete or update this post",
        });
      }
    });
};