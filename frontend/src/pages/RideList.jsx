"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
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

export default function RideSearchPage() {
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
const [suggestionsTo, setSuggestionsTo] = useState([]);

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
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

const handleSearch = async () => {
  if (!from.trim() || !to.trim()) return;

  setLoading(true);
  setHasSearched(true);

  // Clear suggestions
  setSuggestionsFrom([]);
  setSuggestionsTo([]);

  try {
    const response = await axios.get("http://localhost:5000/api/ride/allRides");
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



  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
<section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <div className="absolute inset-0 hero-grid opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Ride</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Search for available rides and connect with verified drivers in your area
            </motion.p>

            {/* Search Form */}
            <motion.div
              className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 border border-white/30 shadow-2xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
  placeholder="Start location"
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
  className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 pl-10"
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
  placeholder="Destination"
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
  className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 pl-10"
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

                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    disabled={loading || !from.trim() || !to.trim()}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
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
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
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
                  {rides.map((ride, index) => (
                    <motion.div key={ride._id} variants={fadeInUp}>
                      <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group">
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
                                  <h3 className="font-semibold text-slate-800">{ride.driverName || "Driver"}</h3>
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
                              <div className="text-2xl font-bold text-blue-600">₹{ride.contribution}</div>
                              <div className="text-sm text-slate-500">per person</div>
                            </div>
                          </div>

                          {/* Route Info */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="font-medium text-slate-800">{ride.from}</span>
                            </div>
                            <div className="flex items-center gap-3 ml-1">
                              <div className="w-1 h-8 bg-slate-300 rounded-full"></div>
                              <div className="text-sm text-slate-500">
                                {ride.distance || "Calculating..."} • {ride.duration || "Est. time"}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="font-medium text-slate-800">{ride.to}</span>
                            </div>
                          </div>

                          {/* Trip Details */}
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(ride.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{ride.departureTime || "Flexible"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{ride.passengers} seats</span>
                              </div>
                            </div>
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
                            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-xl">
                              Book Ride
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
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

