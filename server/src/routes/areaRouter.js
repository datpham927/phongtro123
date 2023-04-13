const express = require("express");
const areaController = require("../controllers/areaController");

const router = express.Router();

router.get("/", areaController.area);

module.exports = router;
