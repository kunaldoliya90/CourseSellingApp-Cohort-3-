const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

const userRouter = Router();

// User Signup Route
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Basic validation
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Signin Route
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_SECRET, {
      expiresIn: "1h", // Set token to expire in 1 hour (optional)
    });

    return res.status(200).json({
      message: "User signed in successfully.",
      jwt_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Course Purchase Route
userRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.body;

  // Validate courseId
  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required." });
  }

  try {
    await purchaseModel.create({
      userId,
      courseId,
    });

    res.status(201).json({
      message: "You have successfully bought this course.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Course Preview Route
userRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.status(200).json({
      courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Purchases Route
userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const purchases = await purchaseModel.find({ userId });
    res.status(200).json({
      purchases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  userRouter,
};
