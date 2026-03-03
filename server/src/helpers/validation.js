const Users = require("../models/userModel");
const User = require("../models/userModel");

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

exports.validateLength = (text, min, max) => {
  if (text.length < min || text.length > max) {
    return false;
  } else {
    return true;
  }
};

exports.validateUsername = async (username) => {
  let isTrue = false;
  do {
    let user = await Users.findOne({ username: username });
    if (user) {
      username += (new Date() * Math.random()).toString().substring(0, 1);
      isTrue = true;
    } else {
      isTrue = false;
    }
  } while (isTrue);
  return username;
};
