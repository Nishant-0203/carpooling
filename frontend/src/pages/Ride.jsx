"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Search,
  Loader2,
  MessageCircle,
  Phone,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardHover = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const buttonHover = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function RideSearchPage() {
  const location = useLocation();
  const rideQuery = location.state || {};

  const {
    fromLocation = "",
    toLocation = "",
    date: queryDate = "",
    time: queryTime = "",
    transportMode = "",
  } = rideQuery;
  useEffect(() => {
    if (fromLocation) setFrom(fromLocation);
    if (toLocation) setTo(toLocation);
    if (queryDate) setDate(queryDate);
    if (queryTime) setTime(queryTime);
    if (transportMode) setTransport(transportMode);
  }, [fromLocation, toLocation, queryDate, queryTime, transportMode]);

  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [sortOption, setSortOption] = useState("recommended");

  const locations = [
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

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [transport, setTransport] = useState("");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Helper function to extract city name from location string
  const extractCityName = (location) => {
    if (!location) return "";
    
    // Remove common suffixes and extract the main city name
    const cleaned = location
      .replace(/,.*$/, '') // Remove everything after first comma
      .replace(/\s+(Airport|Railway Station|Bus Stand|Metro Station)\s*$/i, '') // Remove transport hubs
      .trim()
      .toLowerCase();
    
    return cleaned;
  };

  // Unified time parsing function that handles both 12-hour and 24-hour formats
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') return null;
    
    const trimmedTime = timeStr.trim();
    if (!trimmedTime.includes(':')) return null;
    
    // Handle 12-hour format (e.g., "2:30 PM", "11:45 AM")
    if (trimmedTime.includes('AM') || trimmedTime.includes('PM')) {
      const [timePart, modifier] = trimmedTime.split(/\s+/);
      let [hours, minutes] = timePart.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) return null;
      
      // Validate hours and minutes ranges
      if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;
      
      if (modifier && modifier.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (modifier && modifier.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return hours * 60 + minutes;
    }
    
    // Handle 24-hour format (e.g., "14:30", "09:45")
    const [hours, minutes] = trimmedTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    
    // Validate hours and minutes ranges for 24-hour format
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    
    return hours * 60 + minutes;
  };

  // Helper function to format time for display (converts to 12-hour format)
  const formatTimeForDisplay = (timeStr) => {
    if (!timeStr) return "Flexible";
    
    const minutes = parseTimeToMinutes(timeStr);
    if (minutes === null) return timeStr; // Return original if can't parse
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const sortedRides = [...rides].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (a.contribution || 0) - (b.contribution || 0);
      case "price-high":
        return (b.contribution || 0) - (a.contribution || 0);
      case "time": {
        const timeA = parseTimeToMinutes(a.time || a.departureTime || "");
        const timeB = parseTimeToMinutes(b.time || b.departureTime || "");
        
        // Handle cases where time parsing fails
        if (timeA === null && timeB === null) return 0;
        if (timeA === null) return 1; // Put rides without time at the end
        if (timeB === null) return -1;
        
        return timeA - timeB;
      }
      case "rating":
        return (b.driver?.rating || 0) - (a.driver?.rating || 0);
      case "recommended":
      default:
        return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()); // Newest first
    }
  });

  const handleSearch = async () => {
    if (!from.trim() || !to.trim()) return;

    setLoading(true);
    setHasSearched(true);

    // Clear suggestions
    setSuggestionsFrom([]);
    setSuggestionsTo([]);

    try {
      const response = await axios.get("http://localhost:5000/api/rides/allRides");
      const filteredRides = response.data.filter((ride) => {
        // Handle inconsistent field names in your data
        const rideFromFull = (ride.from || ride.fromLocation || "").trim().toLowerCase();
        const rideToFull = (ride.to || ride.toLocation || "").trim().toLowerCase();
        const inputFromFull = from.trim().toLowerCase();
        const inputToFull = to.trim().toLowerCase();

        // Try exact/partial matching first
        let matchesFromTo = rideFromFull.includes(inputFromFull) && rideToFull.includes(inputToFull);

        // If no match, try city name matching
        if (!matchesFromTo) {
          const rideFromCity = extractCityName(rideFromFull);
          const rideToCity = extractCityName(rideToFull);
          const inputFromCity = extractCityName(inputFromFull);
          const inputToCity = extractCityName(inputToFull);

          matchesFromTo = rideFromCity.includes(inputFromCity) && rideToCity.includes(inputToCity);
        }
        
        // Date filtering
        const matchesDate = date ? ride.date === date : true;

        // Time filtering - handle both 24hr (from input) and 12hr (from data) formats
        const matchesTime = time
          ? (() => {
              // Parse input time (24-hour format from HTML time input)
              const inputTimeMinutes = parseTimeToMinutes(time);
              if (inputTimeMinutes === null) return true; // If can't parse input time, include all rides

              // Handle both 'time' and 'departureTime' fields
              const rideTimeStr = ride.time || ride.departureTime || "";
              if (!rideTimeStr) return true; // If no time specified, include the ride

              const rideTimeMinutes = parseTimeToMinutes(rideTimeStr);
              if (rideTimeMinutes === null) return true; // If can't parse ride time, include the ride

              // Show rides that depart at or after the selected time
              return rideTimeMinutes >= inputTimeMinutes;
            })()
          : true;

        // Transport filtering - handle both 'transport' and 'transportMode' fields
        const matchesTransport = transport && transport !== 'all'
          ? (() => {
              const rideTransport = (ride.transport || ride.transportMode || "").toLowerCase();
              return rideTransport.includes(transport.toLowerCase());
            })()
          : true;

        return matchesFromTo && matchesDate && matchesTime && matchesTransport;
      });

      setRides(filteredRides);
    } catch (error) {
      console.error("Error fetching rides:", error);
      toast.error("Failed to fetch rides. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="CoGo Search Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CoGo</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Search for available carpool rides and connect with verified drivers in your area. Save money, reduce emissions, and make new friends on your journey.
            </motion.p>

            {/* Search Form */}
            <motion.div
              className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 border border-white/30 shadow-2xl max-w-9xl mx-auto"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Enter pickup location"
                      value={from}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFrom(val);
                        setSuggestionsFrom(
                          locations.filter((loc) =>
                            loc.toLowerCase().includes(val.toLowerCase())
                          )
                        );
                      }}
                      onKeyPress={handleKeyPress}
                      className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 pl-10 placeholder:text-slate-600"
                    />
                    {suggestionsFrom.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-md max-h-40 overflow-y-auto border border-slate-200">
                        {suggestionsFrom.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setFrom(suggestion);
                              setSuggestionsFrom([]);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-slate-100 text-sm text-slate-700"
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTo(val);
                        setSuggestionsTo(
                          locations.filter((loc) =>
                            loc.toLowerCase().includes(val.toLowerCase())
                          )
                        );
                      }}
                      onKeyPress={handleKeyPress}
                      className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 pl-10 placeholder:text-slate-600"
                    />
                    {suggestionsTo.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-md max-h-40 overflow-y-auto border border-slate-200">
                        {suggestionsTo.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setTo(suggestion);
                              setSuggestionsTo([]);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-slate-100 text-sm text-slate-700"
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Time</label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Transport</label>
                  <Select value={transport} onValueChange={setTransport}>
                    <SelectTrigger className="w-full bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 text-base pl-4">
                      <SelectValue placeholder="Choose transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    disabled={loading || !from.trim() || !to.trim()}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search Rides
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {hasSearched && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Search Results</h2>
                  <p className="text-slate-600">
                    {loading ? "Searching..." : `${rides.length} rides found`}
                    {from && to && (
                      <span className="ml-2">
                        from <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span>
                      </span>
                    )}
                  </p>
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-48 bg-white/80 border-white/50 backdrop-blur-sm rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="time">Departure Time</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-slate-600">Searching for rides...</p>
                  </div>
                </div>
              ) : rides.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {sortedRides.map((ride, index) => (
                    <motion.div key={ride._id} variants={fadeInUp}>
                      <Card 
                        className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group"
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <CardContent className="p-6">
                          {/* Driver Info */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                                  {ride.driverName
                                    ? ride.driverName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                    : "D"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-slate-800">{ride.driver?.name || "Driver"}</h3>
                                  
                                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-0">
                                    Verified
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-slate-600">{ride.rating || "4.8"}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">₹{ride.contribution || "N/A"}</div>
                              <div className="text-sm text-slate-500">per person</div>
                            </div>
                          </div>

                          {/* Route Info */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="font-medium text-slate-800">{ride.from || ride.fromLocation}</span>
                            </div>
                            <div className="flex items-center gap-3 ml-1">
                              <div className="w-1 h-8 bg-slate-300 rounded-full"></div>
                              <div className="text-sm text-slate-500">
                                {ride.distance || "Calculating..."} • {ride.duration || "Est. time"}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="font-medium text-slate-800">{ride.to || ride.toLocation}</span>
                            </div>
                          </div>

                          {/* Trip Details */}
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{ride.date ? new Date(ride.date + "T00:00:00").toLocaleDateString("en-GB") : "Date TBD"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{formatTimeForDisplay(ride.time || ride.departureTime)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{ride.passengers || "N/A"} seats</span>
                              </div>
                            </div>
                          </div>

                          {/* Transport Type */}
                          <div className="mb-4">
                            <Badge variant="outline" className="text-xs bg-white/50 border-slate-200">
                              {ride.transport || ride.transportMode || "Vehicle"}
                            </Badge>
                          </div>

                          {/* Features */}
                          {ride.features && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {ride.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-white/50 border-slate-200">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-xl"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                const now = new Date();
                                const formattedTime = now.toLocaleString("en-IN", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                });

                                toast("Ride Has Been Booked", {
                                  description: `Booked on ${formattedTime}`,
                                  action: {
                                    label: "Read",
                                    onClick: async () => {
                                      // Mark ride as completed in backend
                                      await fetch(`http://localhost:5000/api/rides/rides/${ride._id}/complete`, {
                                        method: "PATCH",
                                      });
                                    },
                                  },
                                });
                              }}>
                              Book Ride
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Created At */}
                          <div className="mt-4 pt-4 border-t border-slate-200/50">
                            <p className="text-xs text-slate-500">
                              Posted on {new Date(ride.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-12 max-w-md mx-auto">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                        <Search className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">No rides found</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        We couldn't find any rides matching your search criteria. Try adjusting your locations or check
                        back later.
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent"
                      >
                        Modify Search
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Offer Ride CTA */}
          {hasSearched && rides.length === 0 && !loading && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-white/30 rounded-3xl p-8 text-center max-w-3xl mx-auto">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Going the same way?</h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Be the first to offer a ride on this route and help other commuters while earning money!
                  </p>
                  <Button className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Offer a Ride
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

