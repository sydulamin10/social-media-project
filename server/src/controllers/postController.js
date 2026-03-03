const PostModel = require("../models/PostModel");
const UserModel = require("../models/userModel");

exports.createPost = async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    await post.populate("userId", "fName lName username profilePicture cover");
    res.status(200).json({
      post: post,
      message: "Post has been created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("following");

    const followingPosts = await PostModel.find({
      userId: { $in: user.following },
    })
      .populate("userId", "fName lName username profilePicture cover gender")
      .populate(
        "comments.commentedBy",
        "fName lName username profilePicture cover"
      )
      .sort({ createdAt: -1 });

    const myPosts = await PostModel.find({ userId: req.user.id })
      .populate("userId", "fName lName username profilePicture cover gender")
      .populate(
        "comments.commentedBy",
        "fName lName username profilePicture cover"
      )
      .sort({ createdAt: -1 });

    let allPosts = [...myPosts, ...followingPosts];
    return res.json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createCommentController = async (req, res) => {
  try {
    const { comment, image, postId } = req.body;
    if (!comment && !image) {
      return res.status(400).json({
        message: "Comment or image is required",
      });
    }
    const newComment = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            text: comment,
            image: image,
            commentedBy: req.user.id,
            commentedAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    )
      .populate("comments.commentedBy", "fName lName username profilePicture")
      .sort({ commentedAt: -1 });

    if (!newComment) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(newComment.comments);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

exports.savePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user = await UserModel.findById(req.user.id);
    const check = user?.savePost.find((a) => a.post.toString() === postId);
    if (check) {
      await UserModel.findByIdAndUpdate(req.user.id, {
        $pull: {
          savePost: {
            _id: check._id,
          },
        },
      });
    } else {
      await UserModel.findByIdAndUpdate(req.user.id, {
        $push: {
          savePost: {
            post: postId,
            saveAt: new Date(),
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndDelete(postId);
    res.json({ status: "Post has been Deleted." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};
