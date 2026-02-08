import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function BookRidePage() {
  const { id } = useParams();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    async function fetchRide() {
      try {
        const res = await axios.get(`${API_URL}/ride/${id}`);
        setRide(res.data.ride);
      } catch (err) {
        // Error fetching ride
      }
    }

    fetchRide();
  }, [id]);

  if (!ride) return <p>Loading ride details...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Ride</h2>
      <p><strong>From:</strong> {ride.from}</p>
      <p><strong>To:</strong> {ride.to}</p>
      <p><strong>Driver:</strong> {ride.driverName}</p>
      <p><strong>Contribution:</strong> ₹{ride.contribution}</p>
    </div>
  );
}
