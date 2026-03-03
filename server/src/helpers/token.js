const jwt = require("jsonwebtoken");
exports.jwToken = (user, expiredIn) => {
  let SECRET_TOKEN = process.env.SECRET_TOKEN;
  return jwt.sign(user, SECRET_TOKEN, {
    expiresIn: expiredIn,
  });
};

exports.verifyToken = (token, SECRET_TOKEN) => {
  let decoded = jwt.verify(token, SECRET_TOKEN);
  return decoded;
};
