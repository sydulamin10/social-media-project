const express = require("express");
const router = express.Router();
const {
  imageListController,
} = require("../../controllers/imageUploadController");
const { deleteFromCloudinary } = require("../../controllers/imageController");
const { authUser } = require("../../middlewares/authorizationMiddleware");

router.post("/delete-from-cloudinary", authUser, deleteFromCloudinary);

module.exports = router;
