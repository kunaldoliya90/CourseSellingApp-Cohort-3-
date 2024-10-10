const express = require("express");
const app = express();
const PORT = 3000;

// Routes
app.post("/user/signup", function (req, res) {
  res.json({
    message: "Signup Endpoint",
  });
});

app.post("/user/signin", function (req, res) {
  res.json({
    message: "Signin Endpoint",
  });
});

app.post("/course/purchase", function (req, res) {
  res.json({
    message: "Purchase Course Endpoint",
  });
});

app.get("/user/purchases", function (req, res) {
  res.json({
    message: "Purchased Courses Endpoint",
  });
});

app.get("/courses", function (req, res) {
  res.json({
    message: "View all courses Endpoint",
  });
});

//   Server listen

app.listen(PORT, function (req, res) {
  console.log(`server running at port ${PORT}`);
});
