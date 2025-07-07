import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  fromLocation: String,
  toLocation: String,
  date: String,
  time: String,
  transportMode: String,
});

export default mongoose.model("Ride", rideSchema);
