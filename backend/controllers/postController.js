const jwt = require("jsonwebtoken");
const fs = require("fs");
const models = require("../models"); // Import the models package
require("dotenv").config(); //  Import the dotenv package

module.exports = {
  createPost: (req, res, next) => {
    // Create a new post
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decoded.id;
    const { title, content } = req.body;

    models.User.findOne({
      where: { id: userId },
    }).then((userFound) => {
      console.log("req", req.files);
      if (userFound) {
        models.Post.create({
          idUSERS: userFound.id,
          title: title,
          content: content,
          image: req.file
            ? `${req.protocol}://${req.get("host")}/images/posts/${
                req.file.filename
              }`
            : null,
          isLike: 0,
        })
          .then((post) => {
            res.status(201).json({
              message: "Post created",
              post: post,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Post not created",
              error: error,
            });
          });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    });
  },
  getPost: (req, res, next) => {
    // Get post by id
    const postId = req.params.idPost;
    console.log(postId);
    models.Post.findOne({
      attributes: ["id", "title", "content", "image", "isLike"],
      where: { id: postId },
    })
      .then((postFound) => {
        if (postFound) {
          res.status(200).json({
            message: "Post found",
            post: postFound,
          });
        } else {
          res.status(404).json({
            message: "Post not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Post not found",
          error: error,
        });
      });
  },
  getAllPosts: (req, res, next) => {
    // Get all posts
    models.Post.findAll({
      attributes: ["id", "idUSERS", "title", "content", "image", "isLike"],
    })
      .then((postsFound) => {
        if (postsFound) {
          res.status(200).json({
            message: "Posts found",
            posts: postsFound,
          });
        } else {
          res.status(404).json({
            message: "Posts not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Posts not found",
          error: error,
        });
      });
  },
  deletePost: (req, res, next) => {
    // Delete post by id
    const postId = req.params.idPost;
    models.Post.destroy({
      where: { id: postId },
    })
      .then((postDeleted) => {
        if (postDeleted) {
          res.status(200).json({
            message: "Post deleted",
          });
        } else {
          res.status(404).json({
            message: "Post not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Post not deleted",
          error: error,
        });
      });
  },
  updatePost: (req, res, next) => {
    // Update post by id
    const postId = req.params.idPost;
    const { title, content } = req.body;
    models.Post.findOne({
      attributes: ["id", "title", "content", "image", "isLike"],
      where: { id: postId },
    }).then((postFound) => {
      if (postFound) {
        postFound
          .update({
            title: title ? title : postFound.title,
            content: content ? content : postFound.content,
            image: req.file
              ? `${req.protocol}://${req.get("host")}/images/posts/${
                  req.file.filename
                }`
              : postFound.image,
          })
          .then((postUpdated) => {
            res.status(200).json({
              message: "Post updated",
              post: postUpdated,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Post not updated",
              error: error,
            });
          });
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    });
  },
};
