const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const models = require("../models");
require("dotenv").config();

module.exports = {
  register: (req, res, next) => {
    // register a new user
    const { email, password, username, biography } = req.body;
    models.User.findOne({
      attributes: ["email"],
      where: { email: email },
    })
      .then((user) => {
        if (user) {
          res.status(400).json({ message: "email already exist" });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                message: "Error hashing password",
              });
            } else {
              models.User.create({
                // create user
                username: username,
                password: hash,
                email: email,
                biography: biography,
                isAdmin: 0,
              })
                .then((user) => {
                  res.status(201).json({
                    message: "User created",
                    user: user.id,
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    message: "Error creating user",
                  });
                });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error finding user",
        });
      });
  },
  login: (req, res) => {
    // login a user
    const { email, password } = req.body;
    models.User.findOne({
      where: { email: email },
    })
      .then((userFound) => {
        if (userFound) {
          if (bcrypt.compareSync(password, userFound.password)) {
            const token = jwt.sign(
              {
                id: userFound.id,
                isAdmin: userFound.isAdmin,
              },
              process.env.SECRET_TOKEN,
              { expiresIn: "24h" }
            );
            res.cookie("jwt", token);
            res.status(200).json({
              message: "User logged in",
              token: token,
            });
          } else {
            //wrong password
            res.status(401).json({
              message: "Wrong password",
            });
          }
        } else {
          return res.status(400).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            message: "Unable To Verify User",
          });
        }
      });
  },
  logout: (req, res) => {
    // logout a user
    res.clearCookie("jwt");
    res.status(200).json({
      message: "User logged out",
    });
  },
  getUser: (req, res) => {
    // get a user
    const userId = req.params.id;
    models.User.findOne({
      attributes: ["id", "username", "email", "biography", "isAdmin"],
      where: { id: userId },
    })
      .then((userFound) => {
        if (userFound) {
          res.status(200).json({
            message: "User found",
            id: userFound.id,
            email: userFound.email,
            username: userFound.username,
            biography: userFound.biography,
            isAdmin: userFound.isAdmin,
          });
        } else {
          res.status(400).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            message: "Unable to verify user",
          });
        }
      });
  },
  getAllUsers: (req, res) => {
    // get all users
    models.User.findAll({
      attributes: ["id", "username", "image", "email", "biography"],
    })
      .then((usersFound) => {
        if (usersFound) {
          res.status(200).json({
            message: "Users found",
            users: usersFound,
          });
        } else {
          res.status(400).json({
            message: "Users not found",
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            message: "Unable to verify users",
          });
        }
      });
  },
  updateUser: (req, res) => {
    // update a user
    const userId = req.params.id;
    models.User.findOne({
      attributes: ["id", "email", "username", "image", "biography"],
      where: { id: userId },
    })
      .then((userFound) => {
        if (userFound) {
          userFound.update({
            username: req.body.username
              ? req.body.username
              : userFound.username, // Ternaire
            image: req.files
              ? `${req.protocol}://${req.get("host")}/images/profils/${
                  req.files["profil_image"][0].filename
                }`
              : userFound.image,
            email: req.body.email ? req.body.email : userFound.email,
            biography: req.body.biography
              ? req.body.biography
              : userFound.biography,
          });
          res.status(200).json({
            message: "User updated",
            id: userFound.id,
            username: userFound.username,
            image: userFound.image,
            email: userFound.email,
            biography: userFound.biography,
          });
        } else {
          res.status(400).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            message: "Unable to update user",
          });
        }
      });
  },
  deleteUser: (req, res) => {
    // delete a user
    const userId = req.params.id;
    models.User.findOne({
      attributes: ["id", "username", "image", "email", "biography"],
      where: { id: userId },
    })
      .then((userFound) => {
        if (userFound) {
          userFound.destroy();
          res.status(200).json({
            message: "User deleted",
          });
        } else {
          res.status(400).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.status(500).json({
            message: "Unable to delete user",
          });
        }
      });
  },
};
