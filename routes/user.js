const { Router } = require("express");
const userRouter = Router();
// const express = require("express");
// const Router = express.Router;


userRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup Endpoint",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signin Endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchased Courses Endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
