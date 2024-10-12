const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  const token = req.body.token;
  const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);

  if (decoded) {
    userId = decoded.id;
    next();
  } else {
    res.json({
      message: "you are not signed in",
    });
  }
}

module.exports = {
  userMiddleware,
};
