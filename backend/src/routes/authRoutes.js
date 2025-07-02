// backend/routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'; // 🔴 This was missing
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const jwtToken = generateJwt(req.user);
    res.redirect(`http://localhost:5173?token=${jwtToken}`);
  }
);

function generateJwt(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
