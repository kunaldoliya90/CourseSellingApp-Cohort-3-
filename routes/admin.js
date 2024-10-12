const { Router } = require("express");
const adminModel = require("../db");
const user = require("./user");
const adminRouter = Router();
const bcrypt = require('bcrypt');

adminRouter.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Basic validation
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const userExist = await adminModel.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    return res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "Signin Endpoint",
  });
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
