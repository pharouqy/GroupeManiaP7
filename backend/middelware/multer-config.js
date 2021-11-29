const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "post_image") callback(null, "./images/posts/");
    else if (file.fieldname === "profil_image")
      callback(null, "./images/profils/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(".")
      .slice(
        0,
        file.originalname.split(".").length -
          (file.originalname.split(".").length - 1)
      )
      .join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage });//.fields([{ name: 'post_image', maxCount: 1 } , { name: 'profil_image', maxCount: 1 }]);
