const { Router } = require("express");
const adminModel = require("../db");
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

adminRouter.post("/", function (req, res) {
  res.json({
    message: "Signin Endpoint",
  });
});

adminRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchased Courses Endpoint",
  });
});

adminRouter.put("/", function (req, res) {
  res.json({
    message: "Admin Course Creation Endpoint",
  });
});

adminRouter.get("/bulk", function (req, res) {
  res.json({
    message: "Admin Course Creation Endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
