const mongoose = require("mongoose");
const userModel = require("./userModel");

const { ObjectId } = mongoose.Schema.Types;

const ResetCode = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("code", ResetCode);
