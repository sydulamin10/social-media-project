const express = require("express");
const mongoose = require("mongoose");
const {
  reactPost,
  getAllReacts,
} = require("../../controllers/reactPostController");
const { authUser } = require("../../middlewares/authorizationMiddleware");
const router = express.Router();

router.put("/react-post", authUser, reactPost);
router.get("/get-all-react/:id", authUser, getAllReacts);

module.exports = router;
