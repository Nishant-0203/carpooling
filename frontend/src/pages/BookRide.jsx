import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const BookRide = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ride/${rideId}`);
        setRide(res.data);
      } catch (err) {
        console.error("Error fetching ride:", err);
      }
    };
    fetchRide();
  }, [rideId]);

  const handleBooking = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/booking", {
        rideId,
        seats,
        userId: localStorage.getItem("userId"), // or from context/auth
      });
      alert("Ride booked successfully!");
      navigate("/my-rides");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Try again.");
    }
  };

  if (!ride) return <div>Loading ride details...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Ride</h2>
      <p><strong>From:</strong> {ride.from}</p>
      <p><strong>To:</strong> {ride.to}</p>
      <p><strong>Date:</strong> {ride.date}</p>
      <p><strong>Driver:</strong> {ride.driverName}</p>
      <p><strong>Price per seat:</strong> ₹{ride.price}</p>
      <p><strong>Available Seats:</strong> {ride.availableSeats}</p>

      <div className="mt-4">
        <label className="block mb-1">Number of Seats:</label>
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          min={1}
          max={ride.availableSeats}
          className="border p-2 rounded w-full"
        />
      </div>

      <Button className="mt-6 w-full" onClick={handleBooking}>
        Book Now
      </Button>
    </div>
  );
};

export default BookRide;
