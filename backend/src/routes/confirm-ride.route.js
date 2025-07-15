import express from "express";
import Ride from "../models/offer-rides.model.js";
import User from "../models/user.model.js"; // Adjust path if needed

const router = express.Router();

// POST /api/confirm-ride
router.post("/", async (req, res) => {
  const { rideId, userId } = req.body;

  if (!rideId || !userId) {
    return res.status(400).json({ message: "rideId and userId are required" });
  }

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Validate required fields
    const requiredFields = ["from", "to", "date", "time", "transport", "passengers", "contribution", "driver"];
    for (const field of requiredFields) {
      if (ride[field] === undefined || ride[field] === null || ride[field] === "") {
        return res.status(400).json({ message: `Ride is missing required field: ${field}` });
      }
    }

    // Make sure passengers is a number
    if (typeof ride.passengers !== "number" || isNaN(ride.passengers)) {
      return res.status(400).json({ message: "Invalid passengers value" });
    }

    if (ride.passengers < 1) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Check if user already confirmed
    if (ride.confirmedRiders.includes(userId)) {
      return res.status(400).json({ message: "User already confirmed for this ride" });
    }

    // Optionally check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update ride
    ride.confirmedRiders.push(userId);
    ride.passengers = Math.max(ride.passengers - 1, 0); // Prevent negative
    await ride.save();

    return res.status(200).json({ message: "Ride confirmed", ride });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;