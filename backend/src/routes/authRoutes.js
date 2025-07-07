import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Google OAuth Step 1
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Step 2 (Callback)
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token
    const jwtToken = generateJwt(req.user);

    // Redirect to frontend with token as query param
    res.redirect(`${process.env.FRONTEND_URL}?token=${jwtToken}`);
  }
);

// Function to generate JWT
function generateJwt(user) {
  return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Normal login & register
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
