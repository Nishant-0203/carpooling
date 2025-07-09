import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookRidePage() {
  const { id } = useParams();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    async function fetchRide() {
      try {
        const res = await axios.get(`http://localhost:5000/api/ride/${id}`);
        setRide(res.data.ride); // <-- FIXED
      } catch (err) {
        console.error("Error fetching ride:", err);
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
