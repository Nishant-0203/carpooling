import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminAuthController.js';

const router = express.Router();

// 📝 Admin Registration
router.post('/register', (req, res, next) => {
  console.log('📩 Incoming POST /api/admin/register');
  next();
}, registerAdmin);

// 🔐 Admin Login
router.post('/login', (req, res, next) => {
  console.log('🔐 Incoming POST /api/admin/login');
  next();
}, loginAdmin);

export default router;
