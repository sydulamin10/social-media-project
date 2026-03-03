const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPost,
  createCommentController,
  savePost,
  deletePost,
} = require("../../controllers/postController");
const { authUser } = require("../../middlewares/authorizationMiddleware");

router.post("/create-post", authUser, createPost);
router.get("/get-all-post", authUser, getAllPost);
router.put("/create-comment", authUser, createCommentController);
router.put("/save-post/:id", authUser, savePost);
router.delete("/delete-post/:id", authUser, deletePost);

module.exports = router;
