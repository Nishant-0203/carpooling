"use client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Car,
  Headphones,
  CheckCircle,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { redirect } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function OfferRidePage() {
  const [fromLocation, setFromLocation] = useState("");
  const navigate = useNavigate();
  const [toLocation, setToLocation] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [modeOfTransport, setModeOfTransport] = useState("Car"); // default value
  // Example: Assume driverId is available from context or session
  // const driverId = sessionStorage.getItem("driverId"); // Ya context se lo





  const locationOptions = [
    // Chandigarh & Tricity
    "Chandigarh, Chandigarh, India",
    "Chandigarh Airport, Chandigarh, India",
    "Chandigarh Railway Station, Chandigarh, India",
    "Sector 17, Chandigarh, India",
    "Sector 43, Chandigarh, India",
    "Panchkula, Haryana, India",
    "Mohali, Punjab, India",
    "Zirakpur, Punjab, India",
    "Manimajra, Chandigarh, India",
    "IT Park, Chandigarh, India",

    // Delhi NCR
    "New Delhi, Delhi, India",
    "Old Delhi, Delhi, India",
    "Delhi Airport (IGI), Delhi, India",
    "Delhi Railway Station, Delhi, India",
    "Connaught Place, Delhi, India",
    "Saket, Delhi, India",
    "Noida, Uttar Pradesh, India",
    "Greater Noida, Uttar Pradesh, India",
    "Gurgaon, Haryana, India",
    "Faridabad, Haryana, India",
    "Ghaziabad, Uttar Pradesh, India",

    // Mumbai Metropolitan Region
    "Mumbai, Maharashtra, India",
    "Mumbai Airport (BOM), Maharashtra, India",
    "Mumbai Central Railway Station, Maharashtra, India",
    "Andheri, Maharashtra, India",
    "Bandra, Maharashtra, India",
    "Borivali, Maharashtra, India",
    "Navi Mumbai, Maharashtra, India",
    "Thane, Maharashtra, India",

    // Bangalore
    "Bengaluru, Karnataka, India",
    "Bangalore Airport (BLR), Karnataka, India",
    "Majestic Bus Stand, Karnataka, India",
    "KR Puram, Karnataka, India",
    "Electronic City, Karnataka, India",
    "Whitefield, Karnataka, India",

    // Hyderabad
    "Hyderabad, Telangana, India",
    "Hyderabad Airport (RGIA), Telangana, India",
    "Secunderabad, Telangana, India",
    "Gachibowli, Telangana, India",
    "Hitech City, Telangana, India",

    // Kolkata
    "Kolkata, West Bengal, India",
    "Howrah Railway Station, West Bengal, India",
    "Sealdah Railway Station, West Bengal, India",
    "Kolkata Airport (CCU), West Bengal, India",
    "Salt Lake City, West Bengal, India",

    // Chennai
    "Chennai, Tamil Nadu, India",
    "Chennai Airport (MAA), Tamil Nadu, India",
    "Chennai Central Railway Station, Tamil Nadu, India",
    "T Nagar, Tamil Nadu, India",
    "Velachery, Tamil Nadu, India",

    // Pune
    "Pune, Maharashtra, India",
    "Shivajinagar, Maharashtra, India",
    "Pune Railway Station, Maharashtra, India",
    "Hinjewadi, Maharashtra, India",
    "Kothrud, Maharashtra, India",

    // Jaipur
    "Jaipur, Rajasthan, India",
    "Jaipur Railway Station, Rajasthan, India",
    "Jaipur Airport (JAI), Rajasthan, India",
    "Malviya Nagar, Rajasthan, India",

    // Lucknow
    "Lucknow, Uttar Pradesh, India",
    "Charbagh Railway Station, Uttar Pradesh, India",
    "Hazratganj, Uttar Pradesh, India",

    // Ahmedabad
    "Ahmedabad, Gujarat, India",
    "Ahmedabad Airport (AMD), Gujarat, India",
    "Sabarmati, Gujarat, India",
    "Maninagar, Gujarat, India",

    // Bhopal & Central India
    "Bhopal, Madhya Pradesh, India",
    "Habibganj Railway Station, Madhya Pradesh, India",
    "Indore, Madhya Pradesh, India",
    "Raipur, Chhattisgarh, India",
    "Nagpur, Maharashtra, India",
    "Jabalpur, Madhya Pradesh, India",

    // North East India
    "Guwahati, Assam, India",
    "Dispur, Assam, India",
    "Shillong, Meghalaya, India",
    "Agartala, Tripura, India",
    "Kohima, Nagaland, India",

    // Hill Stations
    "Shimla, Himachal Pradesh, India",
    "Manali, Himachal Pradesh, India",
    "Dharamshala, Himachal Pradesh, India",
    "Nainital, Uttarakhand, India",
    "Mussoorie, Uttarakhand, India",
    "Ooty, Tamil Nadu, India",
    "Munnar, Kerala, India",
    "Darjeeling, West Bengal, India",
    "Gangtok, Sikkim, India",

    // Goa
    "Goa, Goa, India",
    "Panaji, Goa, India",
    "Vasco da Gama, Goa, India",
    "Madgaon Railway Station, Goa, India",

    // Other major cities
    "Varanasi, Uttar Pradesh, India",
    "Patna, Bihar, India",
    "Ranchi, Jharkhand, India",
    "Jamshedpur, Jharkhand, India",
    "Kanpur, Uttar Pradesh, India",
    "Agra, Uttar Pradesh, India",
    "Amritsar, Punjab, India",
    "Ludhiana, Punjab, India",
    "Surat, Gujarat, India",
    "Rajkot, Gujarat, India",
    "Coimbatore, Tamil Nadu, India",
    "Madurai, Tamil Nadu, India",
    "Vijayawada, Andhra Pradesh, India",
    "Visakhapatnam, Andhra Pradesh, India",
    "Trivandrum, Kerala, India",
    "Kochi, Kerala, India",
    "Ernakulam, Kerala, India"
  ];


  const handleFromChange = (value) => {
    setFromLocation(value);
    setFromSuggestions(
      locationOptions.filter((loc) =>
        loc.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  const handleToChange = (value) => {
    setToLocation(value);
    setToSuggestions(
      locationOptions.filter((loc) =>
        loc.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (value, type) => {
    if (type === "from") {
      setFromLocation(value);
      setFromSuggestions([]);
    } else {
      setToLocation(value);
      setToSuggestions([]);
    }
  };

  const handleSubmit = async () => {
    const driverId = sessionStorage.getItem("driverId");
    console.log("Driver ID:", driverId);
    if (!driverId) {
      alert("Driver ID not found. Please log in as a driver.");
      return;
    }
    const rideData = {
      from: fromLocation,
      to: toLocation,
      date,
      time,
      transport: modeOfTransport,
      passengers,
      contribution,
      driver: driverId, // 👈 driverId add karo
    };


    try {
      const response = await fetch("http://localhost:5000/api/rides/offer-ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rideData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Ride published successfully!");
      } else {
        alert("Failed to publish ride: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Jaipur");
  const [passengers, setPassengers] = useState(2);
  const [contribution, setContribution] = useState(200);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);


  return (
    <div className="mt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 hero-grid opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            {/* Left Side - Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8 mb-6">
                <CardContent className="p-0">
                  <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* From Field */}
                    <div className="relative">
                      <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <Input
                          placeholder="Enter pickup location"
                          value={fromLocation}
                          onChange={(e) => handleFromChange(e.target.value)}
                          className="border-0 bg-transparent text-slate-800 font-medium text-lg p-0 focus:ring-0 placeholder:text-slate-600"
                        />
                      </div>
                      {fromSuggestions.length > 0 && (
                        <ul className="absolute z-30 bg-white text-black w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                          {fromSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => handleSuggestionClick(suggestion, "from")}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* To Field */}
                    <div className="relative">
                      <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <Input
                          placeholder="Enter destination"
                          value={toLocation}
                          onChange={(e) => handleToChange(e.target.value)}
                          className="border-0 bg-transparent text-slate-800 font-medium text-lg p-0 focus:ring-0 placeholder:text-slate-600"
                        />
                      </div>
                      {toSuggestions.length > 0 && (
                        <ul className="absolute z-30 bg-white text-black w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                          {toSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => handleSuggestionClick(suggestion, "to")}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Date Input */}
                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    {/* Time Input */}
                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none placeholder:text-slate-600"
                      />
                    </div>

                    {/* Mode of Transport */}
                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                      <Car className="w-5 h-5 text-slate-600" />
                      <select
                        value={modeOfTransport}
                        onChange={(e) => setModeOfTransport(e.target.value)}
                        className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none"
                      >
                        {["Car", "Bike", "Auto", "Bus", "Taxi"].map((option) => (
                          <option key={option} value={option} className="text-slate-800 bg-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>


                    {/* Passengers */}
                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                      <Users className="w-5 h-5 text-slate-600" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="text-slate-800 bg-white">
                            {num} passenger{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Money Input */}
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50 mt-4">
                    <span className="text-green-600 text-xl font-bold">₹</span>
                    <Input
                      type="number"
                      placeholder="Enter amount per passenger"
                      value={contribution}
                      onChange={(e) => setContribution(Number(e.target.value))}
                      className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none w-[76%] placeholder:text-slate-600"
                    />
                    <span className="text-slate-600">per passenger</span>
                  </div>

                  <div className="mt-8">
                    <div className="text-center mb-6">
                      <p className="text-lg text-slate-700 mb-2">
                        Save up to <span className="text-2xl font-bold text-blue-600">₹1,624</span>
                      </p>
                      <p className="text-slate-600">on your first ride.</p>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Publish a ride
                    </Button>

                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
