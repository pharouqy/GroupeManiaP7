const express = require("express");
const router = express.Router();

const authCtrl = require("../middelware/authCtrl");

const commentCtrl = require("../controllers/commentCotroller");
const authComment = require("../middelware/authComment");

router.post("/:idPost", commentCtrl.createComment); // Create a new comment
router.get("/:idPost", authComment, commentCtrl.getAllComments); // Get all comments
//router.get("/", authCtrl, commentCtrl.getOneComment);
router.put("/:idComment", authComment, commentCtrl.updateComment); // Update a comment
router.delete("/:idComment", authComment, commentCtrl.deleteComment); // Delete a comment

module.exports = router;