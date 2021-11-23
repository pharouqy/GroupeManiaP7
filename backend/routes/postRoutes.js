const express = require("express");
const router = express.Router();

const multer = require("../middelware/multer-config");

const postCtrl = require("../controllers/postController");
const checkPostInput = require("../middelware/checkInputPost");
const authCtrl = require("../middelware/authCtrl");
const authPost = require("../middelware/authPost");

router.post("/new/:id", authCtrl, /*checkPostInput,*/ multer, postCtrl.createPost); // Create a new post
router.get("/:idPost/", postCtrl.getPost); // Get a post
router.get("/", postCtrl.getAllPosts); // Get all posts
router.delete("/:idPost/", authPost, postCtrl.deletePost); // Delete a post
router.put("/:idPost/", /*checkPostInput,*/authPost, multer, postCtrl.updatePost); // Update a post

module.exports = router;