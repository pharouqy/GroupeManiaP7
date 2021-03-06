const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package
const bcrypt = require("bcrypt"); // Import the bcrypt package
const fs = require("fs"); //
const models = require("../models"); // Import the models package
require("dotenv").config(); //  Import the dotenv package

module.exports = {
  register: (req, res, next) => {
    //register user
    // register a new user
    const { email, password, username, biography } = req.body; // destructuring
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
                image: `${req.protocol}://${req.get(
                  "host"
                )}/images/user/profil.png`,
                biography: biography,
                isAdmin: 0,
              })
                .then((user) => {
                  const token = jwt.sign(
                    {
                      id: user.id,
                      isAdmin: user.isAdmin,
                    },
                    process.env.SECRET_TOKEN,
                    { expiresIn: "24h" }
                  );
                  console.log(token);
                  res.status(200).cookie("token", token, { maxAge: 9000000, httpOnly: false,}); // set cookie
                  res.status(201).json({message: "User created",token: token,});
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
    // login user
    // login a user
    const { email, password } = req.body; // destructuring
    models.User.findOne({
      attributes: ["id", "username", "email", "password", "isAdmin"],
      where: { email: email },
    })
      .then((userFound) => {
        console.log(userFound);
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
            res
              .status(200)
              .cookie("token", token, { maxAge: 9000000, httpOnly: false });
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
    // logout user
    // logout a user
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out",
    });
  },
  getUser: (req, res) => {
    // get user
    // get a user
    const token = req.cookies.token;
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decoded.id;
    models.User.findOne({
      attributes: ["id", "username", "email", "image", "biography", "isAdmin"],
      where: { id: userId },
    })
      .then((userFound) => {
        if (userFound) {
          res.status(200).json({
            message: "User found",
            id: userFound.id,
            email: userFound.email,
            username: userFound.username,
            image: userFound.image,
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
    // get all users
    models.User.findAll({
      attributes: ["id", "username", "image", "email", "biography", "isAdmin"],
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
    // update user
    // update a user
    const userId = req.params.id;
    models.User.findOne({
      attributes: ["id", "email", "username", "image", "biography"],
      where: { id: userId },
    })
      .then((userFound) => {
        if (userFound) {
          userFound.update({
            attributes: ["id", "email", "username", "image", "biography"],
            where: { id: userId },
            username: req.body.username
              ? req.body.username
              : userFound.username, // Ternaire
            image: req.file
              ? `${req.protocol}://${req.get("host")}/images/profils/${
                  req.file.filename
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
        res.status(500).json({
          message: "Unable to update user",
          error: error,
        });
      });
  },
  deleteUser: (req, res) => {
    // delete user
    // delete a user
    const userId = req.params.id;
    models.User.findOne({
      attributes: ["id"],
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
