const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleweras/middleware");

const router = express.Router();

router.get("/detail", verifyToken, userController.getOneUser);
router.put("/update", verifyToken, userController.updateUser);

module.exports = router;
