const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const reactModel = new Schema({
  react: {
    type: String,
    enum: ["Like", "Love", "Haha", "Angry", "Wow", "Sad"],
  },
  postId: {
    type: ObjectId,
    ref: "Post",
  },
  reactBy: {
    type: ObjectId,
    ref: "user",
  },
});
module.exports = mongoose.model("Reacts", reactModel);
