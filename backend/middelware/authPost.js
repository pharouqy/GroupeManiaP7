const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decoded.id;
  const userRole = decoded.isAdmin;
  console.log(userRole);
  const postId = req.params.idPost;
  models.Post.findOne({
    attributes: ["id", "idUSERS"],
    where: {
      id: postId,
    },
  }).then((post) => {
    if (post.idUSERS == userId || userRole == 1) {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to delete or update this post",
      });
    }
  });
};
