// backend/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("🔐 Register attempt:", { name, email });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("❌ Registration failed: User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password }); // no manual hash
    await newUser.save();

    const token = newUser.generateAuthToken();

    console.log("✅ Registration successful for:", email);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔓 Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Login failed: User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("❌ Login failed: Incorrect password");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();

    console.log("✅ Login successful:", email);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      console.log("❌ User not found:", req.user._id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("✅ User profile retrieved:", user.email);
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error retrieving user profile:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};