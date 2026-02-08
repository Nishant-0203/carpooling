import express from 'express';
import { registerDriver, loginDriver } from '../controllers/driver.controller.js';

const router = express.Router();

// Driver Registration
router.post('/register', registerDriver);

// Driver Login
router.post('/login', loginDriver);

export default router;
