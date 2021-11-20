const express = require("express");
const router = express.Router();

const authCtrl = require("../middelware/authCtrl");

const commentCtrl = require("../controllers/commentCotroller");
const authComment = require("../middelware/authComment");

router.post("/:id/:idPost", authCtrl, commentCtrl.createComment); // Create a new comment
router.get("/:id/:idPost", authCtrl, commentCtrl.getAllComments); // Get all comments
//router.get("/:id", authCtrl, commentCtrl.getOneComment);
router.put("/:id/:idPost/:idComment", authCtrl, authComment, commentCtrl.updateComment); // Update a comment
router.delete("/:id/:idPost/:idComment", authCtrl, authComment, commentCtrl.deleteComment); // Delete a comment

module.exports = router;