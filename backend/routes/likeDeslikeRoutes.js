const express = require("express");
const router = express.Router();

const likeDeslikeCtrl = require("../controllers/likeDeslikeController");
const likeDeslikeOnes = require("../middelware/likeDeslikeOnes");
const authCookieCtrl = require("../middelware/authCookies");

router.post("/:idPost/like", authCookieCtrl, likeDeslikeOnes, likeDeslikeCtrl.likePost);
router.post("/:idPost/deslike", authCookieCtrl, likeDeslikeCtrl.deslikePost);

module.exports = router;   // Export the router