const express = require("express");
const router = express.Router();
const ThoughtController = require("../controllers/ThoughtController");
//controler

//router.get("/", ThoughtController.showToughts);
router.get("/", ThoughtController.showThoughts);

module.exports = router;
