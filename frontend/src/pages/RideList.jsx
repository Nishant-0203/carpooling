"use client";
import { useState } from "react";
import axios from "axios";

export default function RideSearchPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

const handleSearch = async () => {
  setLoading(true);
  try {
    const response = await axios.get("http://localhost:5000/api/ride/allRides");

    // FRONTEND FILTERING: Exact match for 'from' and 'to'
    const filteredRides = response.data.filter(
      (ride) =>
        ride.from.trim().toLowerCase() === from.trim().toLowerCase() &&
        ride.to.trim().toLowerCase() === to.trim().toLowerCase()
    );

    setRides(filteredRides);
  } catch (error) {
    console.error("Error fetching rides:", error);
  }
  setLoading(false);
};


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Find a Ride</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search Ride"}
        </button>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-4">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <div key={ride._id} className="border p-4 rounded shadow">
              <p><strong>From:</strong> {ride.from}</p>
              <p><strong>To:</strong> {ride.to}</p>
              <p><strong>Passengers:</strong> {ride.passengers}</p>
              <p><strong>Contribution:</strong> ₹{ride.contribution}</p>
              <p className="text-sm text-gray-500">Created at: {new Date(ride.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{loading ? "" : "No rides found."}</p>
        )}
      </div>
    </div>
  );
}
