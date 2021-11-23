const express = require("express");
const router = express.Router();

const multer = require("../middelware/multer-config");

const userCtrlr = require("../controllers/userController");
const emailCtrl = require("../middelware/checkEmail");
const passwordCtrl = require("../middelware/checkPassword");
const inputCtrl = require("../middelware/checkInput");
const authCtrl = require("../middelware/authCtrl");

router.post("/register",inputCtrl, emailCtrl, passwordCtrl, userCtrlr.register); //register
router.post("/login", userCtrlr.login); //login
router.get("/logout/", userCtrlr.logout); //logout
router.get("/profil/", userCtrlr.getUser); //get user
router.get("/profils/", userCtrlr.getAllUsers); //get all users
router.put("/profil/:id", authCtrl, multer, userCtrlr.updateUser); //update user
router.delete('/profil/:id', authCtrl, userCtrlr.deleteUser); //delete user

module.exports = router;