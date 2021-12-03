const models = require("../models"); // Import the models package
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package

module.exports = {
  likePost: (req, res, next) => { // likePost
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decoded.id;
    const postId = req.params.idPost;
    models.Post.findOne({
      attributes: ["id", "idUSERS", "isLike"], 
      where: {
        id: postId,
      },
    })
      .then((postFound) => { // si le post est trouvé
        if (postFound) {
          models.Like.create({
            idUSERS: userId,
            idPOSTS: postId,
          })
            .then((likeCreated) => { // si le like est créé
              if (likeCreated) {
                models.Post.update(
                  { isLike: postFound.isLike + 1 },
                  { where: { id: postId } }
                )
                  .then((postUpdated) => { // si le post est mis à jour
                    if (postUpdated) {
                      res.status(200).json({
                        message: "Like created",
                        like: likeCreated,
                      });
                    } else {
                      res.status(404).json({
                        message: "Like not created",
                      });
                    }
                  })
                  .catch((err) =>
                    res.status(500).json({ message: "Like not created" })
                  );
              } else {
                res.status(500).json({
                  message: "like not created",
                });
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.status(404).json({
            error: "Post not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  deslikePost: (req, res, next) => { // deslikePost
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decoded.id;
    const postId = req.params.idPost;
    models.Post.findOne({ // findOne pour trouver un post
      attributes: ["id", "idUSERS", "isLike"],
      where: {
        id: postId,
      },
    })
      .then((postFound) => { // si le post est trouvé
        if (postFound) {
          models.Like.destroy({ // delete le like
            where: {
              idUSERS: userId,
              idPOSTS: postId,
            },
          })
            .then((likeDeleted) => {
              if (likeDeleted) {
                models.Post.update( // update le post
                  { isLike: postFound.isLike - 1 },
                  { where: { id: postId } }
                )
                  .then((postUpdated) => {
                    if (postUpdated) {
                      res.status(200).json({
                        message: "Like deleted",
                        like: likeDeleted,
                      });
                    } else {
                      res.status(404).json({
                        message: "Like not deleted",
                      });
                    }
                  })
                  .catch((err) =>
                    res.status(500).json({ message: "Like not deleted" })
                  );
              } else {
                res.status(500).json({
                  message: "Like not deleted",
                });
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.status(404).json({
            error: "Post not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};
