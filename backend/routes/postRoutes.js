const express = require("express");
const router = express.Router();

const multer = require("../middelware/multer-config");

const postCtrl = require("../controllers/postController");
const checkPostInput = require("../middelware/checkInputPost");
const authCtrl = require("../middelware/authCtrl");
const authPost = require("../middelware/authPost");
const authCookieCtrl = require("../middelware/authCookies");

router.post("/new", authCookieCtrl, /*authCtrl, checkPostInput,*/ multer.single("post_image"), postCtrl.createPost); // Create a new post
router.get("/:idPost/", postCtrl.getPost); // Get a post
router.get("/", postCtrl.getAllPosts); // Get all posts
router.delete("/:idPost/", authCookieCtrl, postCtrl.deletePost); // Delete a post
router.put("/:idPost/", authCookieCtrl, /*checkPostInput,*/ /*authPost,*/ multer.single("post_image"), postCtrl.updatePost); // Update a post

module.exports = router;