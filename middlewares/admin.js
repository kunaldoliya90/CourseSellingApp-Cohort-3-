const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const token = req.body.token;
  const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

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
  adminMiddleware,
};
