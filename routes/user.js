const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const userModel = require("../db.js") // This will not work;
const { userModel, purchaseModel, courseModel } = require("../db");

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Basic validation
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
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

userRouter.post("/signin", async function (req, res) {
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

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "Purchased Courses Endpoint",
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
