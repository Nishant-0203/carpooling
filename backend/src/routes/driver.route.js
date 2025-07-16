import express from 'express';
import { registerDriver, loginDriver } from '../controllers/driver.controller.js';


const router = express.Router();

// 📝 Driver Registration
router.post('/register', (req, res, next) => {
  console.log('📩 Incoming POST /api/Driver/register');
  next();
}, registerDriver);

// 🔐 Driver Login
router.post('/login', (req, res, next) => {
  console.log('🔐 Incoming POST /api/Driver/login');
  next();
}, loginDriver);

export default router;
