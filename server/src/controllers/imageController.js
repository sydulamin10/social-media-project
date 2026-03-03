const PostModel = require("../models/PostModel");
const cloudinary = require("cloudinary");
const fs = require("fs");

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Delete From Cloudinary Function
exports.deleteFromCloudinary = async (req, res) => {
  try {
    const { path, sort, max } = req.body;
    let result = cloudinary.v2.search
      .expression(`${path}`)
      .sort_by("public_id", `${sort}`)
      .max_results(max)
      .execute()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        error.json({
          message: error.message,
        });
      });
    // return res.json(result);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
