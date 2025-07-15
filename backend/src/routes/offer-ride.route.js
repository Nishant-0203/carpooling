import express from "express";
import Ride from "../models/offer-rides.model.js";
import Driver from "../models/driver.model.js";

const router = express.Router();

// POST - Offer a ride
router.post("/offer-ride", async (req, res) => {
  try {
    const { from, to, date, time, transport, passengers, contribution, driver, confirmedRiders } = req.body;

    const DriverExists = await Driver.findOne({ driver });

    if (!DriverExists) {
      throw new Error ("Driver does not exist");
    }

    const ride = new Ride({
      from,
      to,
      date,
      time,
      transport,
      passengers,
      contribution,
      driver,
      confirmedRiders
    });

    await ride.save();
    res.status(201).json({ message: "Ride created", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/allRides", async (req, res) => {
  try {
    const rides = await Ride.find(); // Fetch all rides from MongoDB
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error });
  }
});

export default router;
