import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'cookie-session';
import passport from 'passport';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import contactRoutes from './src/routes/contact.js'; // 👈 NEW
import './src/config/passport.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

connectDB();

app.use(session({
  name: 'google-auth-session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // 👈 NEW

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
