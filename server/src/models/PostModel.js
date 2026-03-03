const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const postModel = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
    },
    images: {
      type: Array,
    },
    text: {
      type: String,
    },
    background: {
      type: String,
    },
    comments: [
      {
        text: {
          type: String,
        },
        image: {
          type: String,
        },
        commentedBy: {
          type: ObjectId,
          ref: "user",
          // required: true,
        },
        commentedAt: {
          type: Date,
          // required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postModel);
