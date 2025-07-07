import express from "express";
import Ride from "../models/rideModel.js"; // your Mongoose model

const router = express.Router();

router.post("/api/rides", async (req, res) => {
  try {
    const { from, to, passengers, contribution } = req.body;
    const ride = new Ride({ from, to, passengers, contribution });
    await ride.save();
    res.status(201).json({ message: "Ride created", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
