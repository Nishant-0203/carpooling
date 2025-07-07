import express from 'express';
import Ride from '../models/Ride.js';

const router = express.Router();

router.post('/submit-ride', async (req, res) => {
  try {
    const { fromLocation, toLocation, date, time, transportMode } = req.body;

    const newRide = new Ride({
      fromLocation,
      toLocation,
      date,
      time,
      transportMode,
    });

    await newRide.save();
    res.status(200).json({ message: 'Ride saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save ride', error });
  }
});

export default router;
