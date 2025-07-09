import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    passengers: {
      type: Number,
      required: true,
      min: 1,
    },
    date: { 
      type: String, 
      required: true 
    }, // or type: Date if you prefer
    time: { 
      type: String, 
      required: true 
    },
    transport: { 
      type: String, 
      required: true, 
      trim: true 
    },
    contribution: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Ride = mongoose.model("rideRoute", rideSchema);

export default Ride;
