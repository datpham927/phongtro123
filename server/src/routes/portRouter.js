const express = require("express");
const verifyToken = require("../middleweras/middleware");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/all", postController.getAllPost);
router.get("/new-post", postController.getNewPosts);
router.post("/create-post", verifyToken, postController.createNewPosts);
router.get("/admin-post", verifyToken, postController.getApiPostAdmin);

module.exports = router;
