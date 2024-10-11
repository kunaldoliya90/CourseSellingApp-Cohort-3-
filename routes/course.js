const express = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Purchase Course Endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "View all courses Endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
