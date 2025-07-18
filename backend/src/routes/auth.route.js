import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Google OAuth Step 1
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Step 2 (Callback)
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token with 24 hours expiry for Google login
    const jwtToken = generateJwt(req.user, '24h');

    // Redirect to frontend with token as query param
    res.redirect(`${process.env.FRONTEND_URL}?token=${jwtToken}`);
  }
);

// Function to generate JWT
function generateJwt(user, expiresIn = '1d') {
  return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn });
}

// Normal login & register
router.post('/register', registerUser);
router.post('/login', loginUser);
// User profile
router.get('/profile', protect, getUserProfile);

export default router;