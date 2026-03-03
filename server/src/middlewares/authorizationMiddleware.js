const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let temporary = req.header("Authorization");
    let loginRefreshToken = temporary
      ? temporary.slice(7, temporary.length)
      : "";

    if (!loginRefreshToken) {
      return res.status(404).json({
        message: "User have not valid token",
      });
    }
    jwt.verify(loginRefreshToken, process.env.SECRET_TOKEN, (error, user) => {
      if (error) {
        return res.status(404).json({
          message: "Invalid Authorization",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
