const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
//controler

//router.get("/", AuthController.showToughts);
router.get("/register", AuthController.register);
router.get("/login", AuthController.login);

module.exports = router;
