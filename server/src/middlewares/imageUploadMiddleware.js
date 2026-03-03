const fs = require("fs");
module.exports.imageUploadMiddleware = async (req, res, next) => {
  console.log(req.body);
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(404).json({
        message: "No File Selected.",
      });
    }
    const selectedFile = Object.values(req.files).flat();
    selectedFile.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/gif"
      ) {
        removeFile(file.tempFilePath);
        return res.status(404).json({
          message:
            "Invalid Image format. Your must use Image format as like as (jpeg, png, webp, gif).",
        });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeFile(file.tempFilePath);
        return res.status(404).json({
          message: `Your uploaded file size is ${file.size}. File size must be less than 1MB`,
        });
      }
      // No need below commented code
      // return res.status(200).json({
      //   message: `File has been uploaded successfully.`,
      // });
    });
    next();
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const removeFile = async (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
