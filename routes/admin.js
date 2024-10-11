const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup Endpoint",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signin Endpoint",
  });
});

adminRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchased Courses Endpoint",
  });
});
adminRouter.put("/course", function (req, res) {
  res.json({
    message: "Admin Course Creation Endpoint",
  });
});
adminRouter.get("course/bulk", function (req, res) {
  res.json({
    message: "Admin Course Creation Endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
