const express = require("express");
const router = express.Router();

const authCtrl = require("../middelware/authCtrl");

const commentCtrl = require("../controllers/commentCotroller");
const authComment = require("../middelware/authComment");
const authCookieCtrl = require("../middelware/authCookies");

router.post("/:idPost", /*authCookieCtrl,*/ commentCtrl.createComment); // Create a new comment
router.get("/", /*authComment,*/ commentCtrl.getAllComments); // Get all comments
//router.get("/", authCtrl, commentCtrl.getOneComment);
router.put("/:idComment", authCookieCtrl, authComment, commentCtrl.updateComment); // Update a comment
router.delete("/:idComment", authCookieCtrl, authComment, commentCtrl.deleteComment); // Delete a comment

module.exports = router;