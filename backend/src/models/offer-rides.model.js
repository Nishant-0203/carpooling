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
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    confirmedRiders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
      },
    ],
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
