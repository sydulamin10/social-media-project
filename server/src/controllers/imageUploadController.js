const PostModel = require("../models/PostModel");
const cloudinary = require("cloudinary");
const fs = require("fs");

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image Upload to temp Folder
exports.imageUploadController = async (req, res) => {
  try {
    const { path } = req.body;
    const selectedFile = Object.values(req.files).flat();
    const images = [];
    for (const file of selectedFile) {
      const url = await uploadedToCloudinary(file, path);
      images.push(url);
      removeFile(file.tempFilePath);
    }
    res.status(200).json(images);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

// Image List Controller
exports.imageListController = (req, res) => {
  try {
    const { path, sort, max } = req.body;
    cloudinary.v2.search
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
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//uploaded To Cloudinary Function
const uploadedToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path },
      (err, res) => {
        if (err) {
          removeFile(file.tempFilePath);
          return res.status(404).json({
            message: "File Upload Failed.",
          });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeFile = async (path) => {
  fs.unlink(path, (error) => {
    if (error) console.log(err);
  });
};

//Delete From Cloudinary Function
const deleteFromCloudinary = async (req, res) => {
  console.log("Delete File from Cloudinary");
  try {
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
