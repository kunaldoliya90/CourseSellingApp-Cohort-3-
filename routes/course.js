const express = require("express");
const courseRouter = Router();

courseRouter.post("/courses/purchase", function (req, res) {
  res.json({
    message: "Purchase Course Endpoint",
  });
});

courseRouter.get("/courses/preview", function (req, res) {
  res.json({
    message: "View all courses Endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
