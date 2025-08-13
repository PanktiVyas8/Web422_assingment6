const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Your user model

const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      userName,
      password: hashedPassword,
      favourites: [],
      history: []
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
