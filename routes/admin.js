const { Router } = require("express");
const { adminModel } = require("../db");
const user = require("./user");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Basic validation
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const adminExist = await adminModel.findOne({ email });
    if (adminExist) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.status(201).json({
      message: "Admin created successfully.",
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Admin Signin
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_ADMIN_SECRET, {
      expiresIn: "1h", // Token expiry time
    });

    return res.status(200).json({
      message: "Admin signed in successfully.",
      jwt_token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.post("/course", function (req, res) {
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

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "Admin Course Creation Endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
