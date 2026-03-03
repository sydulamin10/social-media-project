const express = require("express");
const {
  imageUploadController,
  imageListController,
} = require("../../controllers/imageUploadController");
const {
  imageUploadMiddleware,
} = require("../../middlewares/imageUploadMiddleware");
const { authUser } = require("../../middlewares/authorizationMiddleware");
const router = express.Router();

router.post(
  "/upload-image",
  authUser,
  imageUploadMiddleware,
  imageUploadController
);
router.post("/image-list", authUser, imageListController);

module.exports = router;
