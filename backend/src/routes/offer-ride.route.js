import express from "express";
import Ride from "../models/offer-rides.model.js";
import Driver from "../models/driver.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// JWT auth middleware
// function authenticateJWT(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// }

// POST - Offer a ride
router.post("/offer-ride", async (req, res) => {
  try {
    const { from, to, date, time, transport, passengers, contribution, driver, confirmedRiders } = req.body;

    const DriverExists = await Driver.findById(driver);

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
    const rides = await Ride.find().populate('driver', 'name'); // Fetch all rides and populate driver name
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error });
  }
});
router.get("/allRides/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const rides = await Driver.findById(driverId); // Fetch rides for this driver
    res.status(200).json({
      message: "Rides fetched successfully",
      rides
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error });
  }
});

// GET - Get rides for the current driver using JWT
router.get("/my-rides", async (req, res) => {
  try {
    const driverId = req.query.driverId || (req.session && req.session.driverId);
    if (!driverId) {
      return res.status(401).json({ message: "Not logged in as driver" });
    }
    const rides = await Ride.find({ driver: driverId });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error });
  }
});

// PATCH - Edit a ride
router.patch("/rides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const ride = await Ride.findByIdAndUpdate(id, update, { new: true });
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json({ message: "Ride updated", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Mark a ride as completed
router.patch("/rides/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findByIdAndUpdate(id, { completed: true }, { new: true });
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json({ message: "Ride marked as completed", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete a ride
router.delete("/rides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findByIdAndDelete(id);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json({ message: "Ride deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
