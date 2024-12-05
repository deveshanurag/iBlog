const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("Enter all input fields");
    return;
  }
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(400).send("You are already registered. Please login");
    return;
  }
  const newUser = await User.create({
    name,
    email,
    password,
    role: role || undefined,
  });
  if (newUser) {
    res.status(201).send({
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
    return;
  } else {
    res.status(500).send("Server Error");
  }
};

const userLogin = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).send("User not found");
    }

    // Check password
    const passwordMatch = await oldUser.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).send("Please enter correct credentials");
    }

    // Send successful response
    return res.status(200).send({
      name: oldUser.name,
      email: oldUser.email,
      token: generateToken(oldUser._id), // Ensure generateToken is properly implemented
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Server error");
  }
};

module.exports = { userRegister, userLogin };
