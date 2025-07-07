import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rideRoutes from './src/routes/rideRoutes.js';
import session from 'express-session';
import passport from 'passport';
import rideRoutes from "./routes/ride.js";
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import contactRoutes from './src/routes/contact.js'; // 👈 NEW
import './src/config/passport.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(rideRoutes);
connectDB();

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_strong_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if you're using HTTPS
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use('/api/rides', rideRoutes);
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // 👈 NEW

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
