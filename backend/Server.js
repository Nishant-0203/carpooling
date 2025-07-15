import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rideRoutes from './src/routes/offer-ride.route.js'; // 👈 NEW
import DriverRoutes from './src/routes/driver.route.js';
import session from 'express-session';
import passport from 'passport';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.route.js';
import contactRoutes from './src/routes/contact.route.js';
import './src/config/passport.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
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
app.use('/api/driver', DriverRoutes);
app.use('/api/rides', rideRoutes);
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); // 👈 NEW

import confirmRideRoutes from './src/routes/confirm-ride.route.js';
app.use('/api/confirm-ride', confirmRideRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
