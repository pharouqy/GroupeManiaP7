const jwt = require("jsonwebtoken");
const fs = require("fs");
const models = require("../models"); // Import the models package
require("dotenv").config();
const sequelize = require("sequelize"); //  Import the dotenv package

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
      attributes: [
        "id",
        "idUSERS",
        "title",
        "content",
        "image",
        "isLike",
        [
          sequelize.fn(
            "date_format",
            sequelize.col("createdAt"),
            "%d %M %Y - %H:%i:%s "
          ),
          "createdAt",
        ],
      ],
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
    models.Post.findOne({
      attributes: ["id", "idUSERS", "title", "content", "image", "isLike"],
      where: { id: postId },
    }).then((postFound) => {
      if (postFound) {
        const filename = postFound.image
          ? postFound.image.split("/images/posts/")[1]
          : null;
        if (fs.existsSync(`./images/posts/${filename}`)) {
          fs.unlink(`images/posts/${filename}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
          models.Post.destroy({
            where: { id: postId },
          }).then((postDeleted) => {
            res.status(200).json({
              message: "Post deleted",
              post: postDeleted,
            });
          });
        } else {
          models.Post.destroy({
            where: { id: postId },
          }).then((postDeleted) => {
            res.status(200).json({
              message: "Post deleted",
              post: postDeleted,
            });
          });
        }
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
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
      const filename = postFound.image
      ? postFound.image.split("/images/posts/")[1]
      : null;
      if (postFound) {
        if (req.file == null) {
          postFound
            .update({
              title: title ? title : postFound.title,
              content: content ? content : postFound.content,
              image: postFound.image,
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
        } else if (fs.existsSync(`./images/posts/${filename}`)) {
          fs.unlink(`images/posts/${filename}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
          postFound
            .update({
              title: title ? title : postFound.title,
              content: content ? content : postFound.content,
              image: `${req.protocol}://${req.get("host")}/images/posts/${
                req.file.filename
              }`,
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
        }
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    });
  },
};
