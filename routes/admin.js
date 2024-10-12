const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin");

const adminRouter = Router();

// Admin Signup
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

    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET, {
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

// Create Course
adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });

    res.status(201).json({
      message: "Course created successfully.",
      courseId: course._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Course
adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageUrl, courseId } = req.body;

  try {
    const course = await courseModel.updateOne(
      { _id: courseId, creatorId: adminId },
      { title, description, price, imageUrl, creatorId: adminId }
    );

    res.status(201).json({
      message: "Course updated successfully.",
      courseId: course._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Retrieve Courses
adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  try {
    const courses = await courseModel.find({ creatorId: adminId });

    res.status(200).json({
      message: "Courses retrieved successfully.",
      courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  adminRouter,
};
