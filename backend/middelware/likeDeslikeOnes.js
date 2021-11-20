const jwt = require("jsonwebtoken");
require("dotenv").config();
const models = require("../models");

module.exports = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decoded.id;
  const postId = req.params.idPost;
  console.log(userId);
  models.Like.findAll({ // findAll pour trouver tous les likes d'un post
    attributes: ["id", "idUSERS", "idPOSTS"],
    where: {
      idPOSTS: postId,
      idUSERS: userId,
    },
  }).then((likeFound) => { // si le like est trouvé
    if (!likeFound[0]) { //
      next();
    } else {
      res.status(401).json({ // si le like n'est pas trouvé
        message: "You can't like this post again",
      });
    }
  });
};
