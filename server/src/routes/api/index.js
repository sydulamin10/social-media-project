const express = require("express");
const router = express.Router();
const auth = require("./auth");
const postRoute = require("./postRoutes");
const upload = require("./upload.js");
const image = require("./image");
const react = require("./reacts.js");

router.use("/auth", auth);
router.use("/post", postRoute);
router.use("/upload", upload);
router.use("/image", image);
router.use("/reacts", react);

module.exports = router;
