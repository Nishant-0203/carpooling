"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Calendar,
  Navigation,
  Phone,
  MessageCircle,
} from "lucide-react"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function RidesPage() {
const location = useLocation();
const rideQuery = location.state || {};

const {
  fromLocation,
  toLocation,
  date,
  time,
  transportMode,
} = rideQuery;

const [searchQuery, setSearchQuery] = useState(`${fromLocation || ""} ${toLocation || ""}`);
const [selectedFilter, setSelectedFilter] = useState(transportMode || "all");
const [sortOption, setSortOption] = useState("recommended");

const [dateFilter, setDateFilter] = useState(date || "");
const [timeFilter, setTimeFilter] = useState(time || "");
const [fromFilter, setFromFilter] = useState(fromLocation || "");
const [toFilter, setToFilter] = useState(toLocation || "");

  const rides = [
    {
      id: 1,
      driver: {
        name: "Arjun Sharma",
        rating: 4.8,
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      from: "Koramangala",
      to: "Electronic City",
      date: "Today",
      time: "9:30 AM",
      transport: "Car",
      seats: 2,
      price: 120,
      distance: "18 km",
      duration: "35 min",
      features: ["AC", "Music", "WiFi"],
    },
    {
      id: 2,
      driver: {
        name: "Priya Patel",
        rating: 4.9,
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      from: "Whitefield",
      to: "MG Road",
      date: "Today",
      time: "10:15 AM",
      transport: "Bike",
      seats: 1,
      price: 80,
      distance: "22 km",
      duration: "45 min",
      features: ["Helmet", "Fast"],
    },
    {
      id: 3,
      driver: {
        name: "Rajesh Kumar",
        rating: 4.7,
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      from: "HSR Layout",
      to: "Indiranagar",
      date: "Tomorrow",
      time: "8:00 AM",
      transport: "Auto",
      seats: 2,
      price: 60,
      distance: "12 km",
      duration: "25 min",
      features: ["Shared", "Economy"],
    },
    {
      id: 4,
      driver: {
        name: "Sneha Reddy",
        rating: 4.9,
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      from: "Jayanagar",
      to: "Banashankari",
      date: "Today",
      time: "6:30 PM",
      transport: "Car",
      seats: 3,
      price: 90,
      distance: "8 km",
      duration: "20 min",
      features: ["AC", "Women Only"],
    },
    {
      id: 5,
      driver: {
        name: "Vikram Singh",
        rating: 4.6,
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      from: "Marathahalli",
      to: "Silk Board",
      date: "Tomorrow",
      time: "7:45 AM",
      transport: "Bike",
      seats: 1,
      price: 70,
      distance: "15 km",
      duration: "30 min",
      features: ["Helmet", "Express"],
    },
    {
      id: 6,
      driver: {
        name: "Anita Joshi",
        rating: 4.8,
        avatar: "/placeholder.svg?height=50&width=50",
        verified: true,
      },
      from: "BTM Layout",
      to: "Koramangala",
      date: "Today",
      time: "11:30 AM",
      transport: "Auto",
      seats: 1,
      price: 45,
      distance: "6 km",
      duration: "15 min",
      features: ["Quick", "Affordable"],
    },
  ]
  function formatDate(dateStr) {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString(undefined, options);
}

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}


  const filteredRides = rides.filter((ride) => {
  const matchesTransport =
    selectedFilter === "all" || ride.transport.toLowerCase() === selectedFilter;

  const matchesFrom =
    !fromFilter || ride.from.toLowerCase().includes(fromFilter.toLowerCase());

  const matchesTo =
    !toFilter || ride.to.toLowerCase().includes(toFilter.toLowerCase());

  const matchesDate =
    !dateFilter || ride.date.toLowerCase() === formatDate(dateFilter);

  const matchesTime =
    !timeFilter || ride.time === formatTime(timeFilter);

  return (
    matchesTransport &&
    matchesFrom &&
    matchesTo &&
    matchesDate &&
    matchesTime
  );
});

  // Apply sorting after filtering
const sortedRides = [...filteredRides].sort((a, b) => {
  switch (sortOption) {
    case "price-low":
      return a.price - b.price;
    case "price-high":
      return b.price - a.price;
    case "time": {
      const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      return parseTime(a.time) - parseTime(b.time);
    }
    case "rating":
      return b.driver.rating - a.driver.rating;
    default:
      return 0; // recommended (no specific sort)
  }
});


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
{/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Ride</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Browse available rides and connect with verified drivers in your area
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            className="backdrop-blur-xl bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
           <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
  <Input
    placeholder="From"
    value={fromFilter}
    onChange={(e) => setFromFilter(e.target.value)}
    className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 px-4"
  />

  <Input
    placeholder="To"
    value={toFilter}
    onChange={(e) => setToFilter(e.target.value)}
    className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 px-4"
  />

  <Input
    type="date"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
    className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 px-4"
  />

  <Input
    type="time"
    value={timeFilter}
    onChange={(e) => setTimeFilter(e.target.value)}
    className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 px-4"
  />

  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
    <SelectTrigger className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12">
      <SelectValue placeholder="Transport type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All Vehicles</SelectItem>
      <SelectItem value="car">Car</SelectItem>
      <SelectItem value="bike">Bike</SelectItem>
      <SelectItem value="auto">Auto</SelectItem>
    </SelectContent>
  </Select>

  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl h-12 font-semibold w-full">
    <Filter className="w-4 h-4 mr-2" />
    Apply Filters
  </Button>
</div>

          </motion.div>
        </div>
      </section>

      {/* Rides Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Available Rides</h2>
              <p className="text-slate-600">{filteredRides.length} rides found</p>
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

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {sortedRides.map((ride, index) => (
              <motion.div key={ride.id} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    {/* Driver Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            {ride.driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800">{ride.driver.name}</h3>
                            {ride.driver.verified && (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-0">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-slate-600">{ride.driver.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 mb-1">
                          {ride.transport}
                        </Badge>
                        <div className="text-2xl font-bold text-blue-600">₹{ride.price}</div>
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
                          {ride.distance} • {ride.duration}
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
                          <span>{ride.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{ride.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{ride.seats} seats</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ride.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white/50 border-slate-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>

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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 py-3 rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              Load More Rides
            </Button>
          </div>
        </div>
      </section>

      {/* Offer Ride CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-3xl mx-auto" {...fadeInUp}>
            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-white/30 rounded-3xl p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <Navigation className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Going Somewhere?</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Offer a ride and earn money while helping others commute sustainably. It's a win-win!
                </p>
                <Button className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Offer a Ride
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
