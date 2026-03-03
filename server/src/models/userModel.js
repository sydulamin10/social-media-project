const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const UserModel = new Schema(
  {
    fName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      text: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      text: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordHistory: [{ type: String }], // সর্বশেষ ৫টা পাসওয়ার্ড
    profilePicture: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      trim: true,
    },
    bDay: {
      type: String,
      required: true,
      trim: true,
    },
    bMonth: {
      type: String,
      required: true,
      trim: true,
    },
    bYear: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    request: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    requestReceived: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "user",
          required: true,
          text: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      workplace: {
        type: String,
      },
      college: {
        type: String,
      },
      highschool: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: [
          "Single",
          "Married",
          "Divorced",
          "In A Relationship",
          "It's Complicated",
        ],
      },
      instagram: {
        type: String,
      },
    },
    savePost: [
      {
        post: {
          type: ObjectId,
          ref: "post",
        },
        saveAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserModel);
