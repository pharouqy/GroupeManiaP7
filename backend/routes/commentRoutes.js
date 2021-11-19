const express = require("express");
const router = express.Router();

const authCtrl = require("../middelware/authCtrl");

const commentCtrl = require("../controllers/commentCotroller");
const authComment = require("../middelware/authComment");

router.post("/:id/:idPost", authCtrl, commentCtrl.createComment);
router.get("/:id/:idPost", authCtrl, commentCtrl.getAllComments);
//router.get("/:id", authCtrl, commentCtrl.getOneComment);
router.put("/:id/:idPost/:idComment", authCtrl, /*authComment,*/ commentCtrl.updateComment);
router.delete("/:id/:idPost/:idComment", authCtrl, authComment, commentCtrl.deleteComment);

module.exports = router;