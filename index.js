const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const app = express();
const PORT = 3000;

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

//   Server listen
app.listen(PORT, function (req, res) {
  console.log(`server running at port ${PORT}`);
});
