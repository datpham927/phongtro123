const express = require("express");
const provinceController = require("../controllers/provinceController");

const router = express.Router();

router.get("/", provinceController.province);

module.exports = router;
