// backend/controllers/authController.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Async error handler
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Helper function to create and send token
const createSendToken = (user, statusCode, res, message = 'Success') => {
  const token = user.generateAuthToken();
  
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      createdAt: user.createdAt
    }
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("🔐 Register attempt:", { name, email });

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("❌ Registration failed: User already exists");
    return res.status(409).json({ 
      success: false,
      message: 'User with this email already exists' 
    });
  }

  // Create new user
  const newUser = await User.create({ name, email, password });

  console.log("✅ Registration successful for:", email);
  createSendToken(newUser, 201, res, 'User registered successfully');
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("🔓 Login attempt:", email);

  // Find user and explicitly select password
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    console.log("❌ Login failed: User not found");
    return res.status(401).json({ 
      success: false,
      message: 'Invalid email or password' 
    });
  }

  // Prevent password login for Google accounts
  if (user.password === 'GOOGLE_AUTH') {
    return res.status(400).json({ 
      success: false,
      message: 'Please login with Google for this account.' 
    });
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    console.log("❌ Login failed: Incorrect password");
    return res.status(401).json({ 
      success: false,
      message: 'Invalid email or password' 
    });
  }

  console.log("✅ Login successful:", email);
  createSendToken(user, 200, res, 'Login successful');
});

export const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by the auth middleware
  const user = await User.findById(req.user._id).select('-password');
  
  if (!user) {
    console.log("❌ User not found:", req.user._id);
    return res.status(404).json({ 
      success: false,
      message: 'User not found' 
    });
  }

  console.log("✅ User profile retrieved:", user.email);
  res.status(200).json({
    success: true,
    user
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  // Get user with password
  const user = await User.findById(req.user._id).select('+password');
  
  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }
  
  // Update password
  user.password = newPassword;
  await user.save();
  
  createSendToken(user, 200, res, 'Password updated successfully');
});

export const forgotPassword = asyncHandler(async (req, res) => {
  // This is a placeholder for forgot password functionality
  // You would typically send an email with a reset token here
  res.status(200).json({
    success: true,
    message: 'Password reset functionality will be implemented soon'
  });
});