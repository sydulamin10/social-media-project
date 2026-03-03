// As per Sir's video

// const mongoose = require("mongoose");
// const reactModel = require("../models/reactModel");

// exports.reactPost = async (req, res) => {
//   try {
//     const { postId, react } = req.body;
//     const check = await reactModel.findOne({
//       postId: postId,
//       reactBy: req.user.id,
//     });
//     if (check === null) {
//       const newReact = new reactModel({
//         react: react,
//         postId: postId,
//         reactBy: req.user.id,
//       });
//       await newReact.save();
//     } else {
//       if (check.react === react) {
//         await reactModel.findByIdAndDelete(check._id);
//       } else {
//         await reactModel.findByIdAndUpdate(check._id, {
//           react: react,
//         });
//       }
//     }
//   } catch (error) {
//     res.status(404).json({
//       message: error,
//     });
//   }
// };

// As per me (With AI help)
const mongoose = require("mongoose");
const reactModel = require("../models/reactModel");
const { ObjectId } = mongoose.Types;
const UserModel = require("../models/userModel");
// Create reactPost Controller for  (if not exist in database)
exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const check = await reactModel.findOne({
      postId,
      reactBy: req.user.id,
    });
    if (!check) {
      await reactModel.create({
        react,
        postId,
        reactBy: req.user.id,
      });
    } else {
      if (check.react === react) {
        await reactModel.findByIdAndDelete(check._id);
      } else {
        await reactModel.findByIdAndUpdate(check._id, { react });
      }
    }
    res.status(200).json({
      success: true,
      message: "Reaction processed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All React from database
exports.getAllReacts = async (req, res) => {
  try {
    let postId = req.params.id;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }
    const reactsArray = await reactModel.find({ postId: postId });
    const check = await reactModel.findOne({
      postId,
      reactBy: req.user.id,
    });
    let newReactsArray = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reactsTotalCount = [
      {
        react: "Like",
        count: newReactsArray.Like ? newReactsArray.Like.length : 0,
      },
      {
        react: "Love",
        count: newReactsArray.Love ? newReactsArray.Love.length : 0,
      },
      {
        react: "Haha",
        count: newReactsArray.Haha ? newReactsArray.Haha.length : 0,
      },
      {
        react: "Angry",
        count: newReactsArray.Angry ? newReactsArray.Angry.length : 0,
      },
      {
        react: "Wow",
        count: newReactsArray.Wow ? newReactsArray.Wow.length : 0,
      },
      {
        react: "Sad",
        count: newReactsArray.Sad ? newReactsArray.Sad.length : 0,
      },
    ];

    // Check if post is already saved or not
    const user = await UserModel.findById(req.user.id);
    let isPostSave = user?.savePost.find(
      (x) => x?.post.toString() === req.params.id
    );
    console.log(isPostSave);

    // Sort based on Count
    reactsTotalCount.sort((a, b) => {
      return b.count - a.count;
    });
    res.status(200).json({
      reactsTotalCount,
      total: reactsArray.length,
      check: check?.react,
      isPostSave: isPostSave ? true : false,
      message: "Reaction processed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
