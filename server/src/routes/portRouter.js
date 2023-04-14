const express = require("express");
const verifyToken = require("../middleweras/middleware");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/all", postController.getAllPost);
router.get("/new-post", postController.getNewPosts);
router.get("/detail-post", verifyToken, postController.getDetailPost);


router.get("/admin-post", verifyToken, postController.getApiPostAdmin);
router.post("/create-post", verifyToken, postController.createNewPosts);
router.put("/update-post", verifyToken, postController.updatePost);
router.delete("/delete-post", verifyToken, postController.deletePost);

module.exports = router;
