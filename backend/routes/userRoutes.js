const express = require("express");
const router = express.Router();

const multer = require("../middelware/multer-config");

const userCtrlr = require("../controllers/userController");
const emailCtrl = require("../middelware/checkEmail");
const passwordCtrl = require("../middelware/checkPassword");
const inputCtrl = require("../middelware/checkInput");
const authCtrl = require("../middelware/authCtrl");
const authCookieCtrl = require("../middelware/authCookies");

router.post("/register",inputCtrl, emailCtrl, passwordCtrl, userCtrlr.register); //register
router.post("/login", userCtrlr.login); //login
router.get("/logout", userCtrlr.logout); //logout
router.get("/profil", userCtrlr.getUser); //get user
router.get("/profils/", userCtrlr.getAllUsers); //get all users
router.put("/update/:id", authCookieCtrl, /*authCtrl,*/ multer.single("profil_image"), userCtrlr.updateUser); //update user
router.delete('/delete/:id', authCookieCtrl, /*authCtrl,*/ userCtrlr.deleteUser); //delete user

module.exports = router;