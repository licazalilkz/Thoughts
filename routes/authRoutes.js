const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
//controler

//get
router.get("/register", AuthController.register);
router.get("/login", AuthController.login);

//post
router.post("/register", AuthController.registerPost);

module.exports = router;
