const express = require("express");
const router = express.Router();

const likeDeslikeCtrl = require("../controllers/likeDeslikeController");
const likeDeslikeOnes = require("../middelware/likeDeslikeOnes");

router.post("/:idPost/like", likeDeslikeOnes, likeDeslikeCtrl.likePost);
router.post("/:idPost/deslike", likeDeslikeCtrl.deslikePost);

module.exports = router;   // Export the router