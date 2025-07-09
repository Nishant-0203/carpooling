import express from "express";
import Ride from "../models/rideRoute.js";

const router = express.Router();

// POST - Offer a ride
router.post("/offerride", async (req, res) => {
  try {
    const { from, to, date, time, transport, passengers, contribution } = req.body;

    const ride = new Ride({
      from,
      to,
      date,
      time,
      transport,
      passengers,
      contribution,
    });

    await ride.save();
    res.status(201).json({ message: "Ride created", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ NEW: GET - Fetch all rides
router.get("/allRides", async (req, res) => {
  try {
    const rides = await Ride.find(); // Fetch all rides from MongoDB
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error });
  }
});

export default router;
