const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
// function userAuth(req, res, next){
//   const token = req.headers.token;
  
// }

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  try {
    // Await the DB connection
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    // Server listen
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
}

main();
