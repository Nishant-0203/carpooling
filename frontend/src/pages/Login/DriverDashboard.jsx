"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Car,
  Bell,
  User,
  LogOut,
  Menu,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Wallet,
  XCircle,
  Eye,
  MoreVertical,
  Navigation,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react";
import OfferRidePage from "../OfferRidePage";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function RiderDashboard() {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const [offeredRides, setOfferedRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editRide, setEditRide] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewRide, setViewRide] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAllRides, setShowAllRides] = useState(false);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("driverId");
    sessionStorage.removeItem("driver");
    navigate("/");
  };

  // Add location options array (same as OfferRidePage)
  const locationOptions = [
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
    "Mumbai, Maharashtra, India",
    "Mumbai Airport (BOM), Maharashtra, India",
    "Mumbai Central Railway Station, Maharashtra, India",
    "Andheri, Maharashtra, India",
    "Bandra, Maharashtra, India",
    "Borivali, Maharashtra, India",
    "Navi Mumbai, Maharashtra, India",
    "Thane, Maharashtra, India",
    "Bengaluru, Karnataka, India",
    "Bangalore Airport (BLR), Karnataka, India",
    "Majestic Bus Stand, Karnataka, India",
    "KR Puram, Karnataka, India",
    "Electronic City, Karnataka, India",
    "Whitefield, Karnataka, India",
    "Hyderabad, Telangana, India",
    "Hyderabad Airport (RGIA), Telangana, India",
    "Secunderabad, Telangana, India",
    "Gachibowli, Telangana, India",
    "Hitech City, Telangana, India",
    "Kolkata, West Bengal, India",
    "Howrah Railway Station, West Bengal, India",
    "Sealdah Railway Station, West Bengal, India",
    "Kolkata Airport (CCU), West Bengal, India",
    "Salt Lake City, West Bengal, India",
    "Chennai, Tamil Nadu, India",
    "Chennai Airport (MAA), Tamil Nadu, India",
    "Chennai Central Railway Station, Tamil Nadu, India",
    "T Nagar, Tamil Nadu, India",
    "Velachery, Tamil Nadu, India",
    "Pune, Maharashtra, India",
    "Shivajinagar, Maharashtra, India",
    "Pune Railway Station, Maharashtra, India",
    "Hinjewadi, Maharashtra, India",
    "Kothrud, Maharashtra, India",
    "Jaipur, Rajasthan, India",
    "Jaipur Railway Station, Rajasthan, India",
    "Jaipur Airport (JAI), Rajasthan, India",
    "Malviya Nagar, Rajasthan, India",
    "Lucknow, Uttar Pradesh, India",
    "Charbagh Railway Station, Uttar Pradesh, India",
    "Hazratganj, Uttar Pradesh, India",
    "Ahmedabad, Gujarat, India",
    "Ahmedabad Airport (AMD), Gujarat, India",
    "Sabarmati, Gujarat, India",
    "Maninagar, Gujarat, India",
    "Bhopal, Madhya Pradesh, India",
    "Habibganj Railway Station, Madhya Pradesh, India",
    "Indore, Madhya Pradesh, India",
    "Raipur, Chhattisgarh, India",
    "Nagpur, Maharashtra, India",
    "Jabalpur, Madhya Pradesh, India",
    "Guwahati, Assam, India",
    "Dispur, Assam, India",
    "Shillong, Meghalaya, India",
    "Agartala, Tripura, India",
    "Kohima, Nagaland, India",
    "Shimla, Himachal Pradesh, India",
    "Manali, Himachal Pradesh, India",
    "Dharamshala, Himachal Pradesh, India",
    "Nainital, Uttarakhand, India",
    "Mussoorie, Uttarakhand, India",
    "Ooty, Tamil Nadu, India",
    "Munnar, Kerala, India",
    "Darjeeling, West Bengal, India",
    "Gangtok, Sikkim, India",
    "Goa, Goa, India",
    "Panaji, Goa, India",
    "Vasco da Gama, Goa, India",
    "Madgaon Railway Station, Goa, India",
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

  const [editFromSuggestions, setEditFromSuggestions] = useState([]);
  const [editToSuggestions, setEditToSuggestions] = useState([]);

  // Fetch driver's offered rides
  const fetchOfferedRides = async () => {
    setLoading(true);
    try {
      const driverId = sessionStorage.getItem("driverId");
      if (!driverId) {
        console.error("Driver ID not found");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/rides/my-rides?driverId=${driverId}`);
      if (response.ok) {
        const data = await response.json();
        setOfferedRides(data);
      } else {
        console.error("Failed to fetch rides");
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a ride
  const deleteRide = async (rideId) => {
    if (!confirm("Are you sure you want to delete this ride?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/rides/rides/${rideId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOfferedRides(prev => prev.filter(ride => ride._id !== rideId));
        alert("Ride deleted successfully!");
      } else {
        alert("Failed to delete ride");
      }
    } catch (error) {
      console.error("Error deleting ride:", error);
      alert("Error deleting ride");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rider/profile/${profile.email}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    if (profile.email) fetchProfile();
  }, [profile.email]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfileToBackend = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rider/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile saved successfully!");
      } else {
        alert("❌ Failed to save profile: " + data.message);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("❌ Server error");
    }
  };

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "book-ride", label: "Offer a Ride", icon: BookOpen },
    { id: "my-rides", label: "My Rides", icon: Car },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  const dashboardStats = [
    {
      title: "Total Rides Offered",
      value: offeredRides.length.toString(),
      change: "+3 this month",
      icon: Car,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Rides",
      value: offeredRides.filter(ride => !ride.completed).length.toString(),
      change: "Awaiting completion",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completed Rides",
      value: offeredRides.filter(ride => ride.completed).length.toString(),
      change: "Total completed",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Earnings",
      value: `₹${offeredRides.reduce((sum, ride) => sum + (ride.contribution || 0), 0)}`,
      change: "Expected earnings",
      icon: Wallet,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifs = localStorage.getItem('driverNotifications');
    if (savedNotifs) {
      setNotifications(JSON.parse(savedNotifs));
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('driverNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif));
      localStorage.setItem('driverNotifications', JSON.stringify(updated));
      return updated;
    });
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "alert":
        return "bg-red-100 text-red-700 border-red-200";
      case "info":
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-3 h-3" />;
      case "alert":
        return <AlertTriangle className="w-3 h-3" />;
      case "info":
      default:
        return <Info className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getRideStatus = (ride) => {
    if (ride.completed) {
      return { status: "Completed", color: "bg-green-100 text-green-700" };
    } else {
      return { status: "Pending", color: "bg-yellow-100 text-yellow-700" };
    }
  };

  // Edit ride handler
  const handleEditRide = (ride) => {
    setEditRide({ ...ride });
    setShowEditModal(true);
  };

  // View ride handler
  const handleViewRide = (ride) => {
    setViewRide(ride);
    setShowViewModal(true);
  };

  // Save edited ride
  const saveEditedRide = async () => {
    if (!editRide) return;
    try {
      const response = await fetch(`http://localhost:5000/api/rides/rides/${editRide._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRide),
      });
      if (response.ok) {
        const data = await response.json();
        setOfferedRides((prev) => prev.map((r) => (r._id === editRide._id ? data.ride : r)));
        setShowEditModal(false);
        setEditRide(null);
        alert("Ride updated successfully!");
      } else {
        alert("Failed to update ride");
      }
    } catch (error) {
      alert("Error updating ride");
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "notifications":
        return (
          <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>
              <Button
                variant="outline"
                className="rounded-xl border border-blue-300 bg-white text-black font-semibold hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                onClick={() => setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))}
              >
                Mark All as Read
              </Button>
            </div>

            <motion.div className="space-y-4" variants={staggerContainer} initial="initial" animate="animate">
              {notifications.map((notification) => (
                <motion.div key={notification.id} variants={fadeInUp}>
                  <Card
                    className={`backdrop-blur-xl border-white/50 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                      notification.read ? "bg-white/30" : "bg-white/50 border-blue-200"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getBadgeVariant(notification.type)} flex items-center gap-1`}>
                              {getBadgeIcon(notification.type)}
                              {notification.type === "success"
                                ? "Success"
                                : notification.type === "alert"
                                  ? "Alert"
                                  : "Info"}
                            </Badge>
                            {!notification.read && (
                              <Badge className="bg-blue-500 text-white text-xs px-2 py-1">New</Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-1">{notification.title}</h3>
                          <p className="text-slate-600 mb-3">{notification.message}</p>
                          <p className="text-sm text-slate-500">{notification.timestamp}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Mark as Read
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )

      case "book-ride":
        return (
          <OfferRidePage />
        )

      case "my-rides":
        return (
          <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">My Offered Rides</h1>
              <Button
                onClick={fetchOfferedRides}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
              >
                Refresh Rides
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading your rides...</p>
              </div>
            ) : offeredRides.length === 0 ? (
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
                <CardContent className="p-0 text-center">
                  <Car className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Rides Offered Yet</h3>
                  <p className="text-slate-600 mb-4">Start offering rides to help fellow travelers!</p>
                  <Button
                    onClick={() => setActiveSection("book-ride")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
                  >
                    Offer Your First Ride
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {(showAllRides ? offeredRides : offeredRides.slice(0, 6))
                    .slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((ride) => {
                      const rideStatus = getRideStatus(ride);
                      return (
                        <motion.div key={ride._id} variants={fadeInUp}>
                          <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6">
                              {/* Header with Status */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${rideStatus.color} text-xs px-3 py-1`}>
                                    {rideStatus.status}
                                  </Badge>
                                  {ride.completed && (
                                    <Badge className="bg-green-600 text-white text-xs px-2 py-1 ml-2">Completed</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg p-1"
                                    onClick={() => handleEditRide(ride)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteRide(ride._id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg p-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Driver Name Badge */}
                              <div className="mb-2">
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1">
                                  {driverProfile.name || "Driver"}
                                </Badge>
                              </div>

                              {/* Route Information */}
                              <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-sm font-medium text-slate-800 truncate">
                                    {ride.from}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <span className="text-sm font-medium text-slate-800 truncate">
                                    {ride.to}
                                  </span>
                                </div>
                              </div>

                              {/* Date and Time */}
                              <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(ride.date)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{formatTime(ride.time)}</span>
                                </div>
                              </div>

                              {/* Ride Details */}
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-white/50 rounded-lg p-3">
                                  <Users className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                                  <p className="text-xs text-slate-600">Passengers</p>
                                  <p className="text-sm font-semibold text-slate-800">{ride.passengers}</p>
                                </div>
                                <div className="bg-white/50 rounded-lg p-3">
                                  <Car className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                                  <p className="text-xs text-slate-600">Transport</p>
                                  <p className="text-sm font-semibold text-slate-800">{ride.transport}</p>
                                </div>
                                <div className="bg-white/50 rounded-lg p-3">
                                  <DollarSign className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                                  <p className="text-xs text-slate-600">Per Person</p>
                                  <p className="text-sm font-semibold text-slate-800">₹{ride.contribution}</p>
                                </div>
                              </div>

                              {/* Action Button */}
                              <div className="mt-4">
                                <Button
                                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg text-sm py-2"
                                  onClick={() => handleViewRide(ride)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                </motion.div>
                {offeredRides.length > 6 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="rounded-xl border border-blue-300 bg-white text-black font-semibold hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                      onClick={() => setShowAllRides((prev) => !prev)}
                    >
                      {showAllRides ? "Show Less" : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Edit Ride Modal */}
            {showEditModal && editRide && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl relative">
                  <button className="absolute top-3 right-3 text-xl" onClick={() => setShowEditModal(false)}>&times;</button>
                  <h2 className="text-2xl font-bold mb-4">Edit Ride</h2>
                  <div className="space-y-3">
                    {/* From field with suggestions */}
                    <div className="relative">
                      <input
                        className="w-full border rounded p-2 placeholder:text-slate-600"
                        value={editRide.from}
                        onChange={e => {
                          setEditRide({ ...editRide, from: e.target.value });
                          setEditFromSuggestions(
                            locationOptions.filter(loc => loc.toLowerCase().includes(e.target.value.toLowerCase()))
                          );
                        }}
                        placeholder="Enter pickup location"
                        autoComplete="off"
                      />
                      {editFromSuggestions.length > 0 && (
                        <ul className="absolute z-30 bg-white text-black w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                          {editFromSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => {
                                setEditRide({ ...editRide, from: suggestion });
                                setEditFromSuggestions([]);
                              }}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* To field with suggestions */}
                    <div className="relative">
                      <input
                        className="w-full border rounded p-2 placeholder:text-slate-600"
                        value={editRide.to}
                        onChange={e => {
                          setEditRide({ ...editRide, to: e.target.value });
                          setEditToSuggestions(
                            locationOptions.filter(loc => loc.toLowerCase().includes(e.target.value.toLowerCase()))
                          );
                        }}
                        placeholder="Enter destination"
                        autoComplete="off"
                      />
                      {editToSuggestions.length > 0 && (
                        <ul className="absolute z-30 bg-white text-black w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                          {editToSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => {
                                setEditRide({ ...editRide, to: suggestion });
                                setEditToSuggestions([]);
                              }}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <input className="w-full border rounded p-2 placeholder:text-slate-600" type="date" value={editRide.date} onChange={e => setEditRide({ ...editRide, date: e.target.value })} />
                    <input className="w-full border rounded p-2 placeholder:text-slate-600" type="time" value={editRide.time} onChange={e => setEditRide({ ...editRide, time: e.target.value })} />
                    <input className="w-full border rounded p-2 placeholder:text-slate-600" type="number" min="1" value={editRide.passengers} onChange={e => setEditRide({ ...editRide, passengers: Number(e.target.value) })} placeholder="Number of passengers" />
                    <input className="w-full border rounded p-2 placeholder:text-slate-600" value={editRide.transport} onChange={e => setEditRide({ ...editRide, transport: e.target.value })} placeholder="Transport type (Car, Bike, etc.)" />
                    <input className="w-full border rounded p-2 placeholder:text-slate-600" type="number" min="0" value={editRide.contribution} onChange={e => setEditRide({ ...editRide, contribution: Number(e.target.value) })} placeholder="Amount per passenger (₹)" />
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1" onClick={saveEditedRide}>Save</Button>
                    <Button className="flex-1" variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {/* View Ride Modal */}
            {showViewModal && viewRide && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl relative text-black">
                  <button className="absolute top-3 right-3 text-xl" onClick={() => setShowViewModal(false)}>&times;</button>
                  <h2 className="text-2xl font-bold mb-4 text-slate-800">Ride Details</h2>
                  <div className="space-y-2">
                    <div><strong className="text-slate-800">From:</strong> <span className="text-slate-700">{viewRide.from}</span></div>
                    <div><strong className="text-slate-800">To:</strong> <span className="text-slate-700">{viewRide.to}</span></div>
                    <div><strong className="text-slate-800">Date:</strong> <span className="text-slate-700">{formatDate(viewRide.date)}</span></div>
                    <div><strong className="text-slate-800">Time:</strong> <span className="text-slate-700">{formatTime(viewRide.time)}</span></div>
                    <div><strong className="text-slate-800">Passengers:</strong> <span className="text-slate-700">{viewRide.passengers}</span></div>
                    <div><strong className="text-slate-800">Transport:</strong> <span className="text-slate-700">{viewRide.transport}</span></div>
                    <div><strong className="text-slate-800">Contribution:</strong> <span className="text-slate-700">₹{viewRide.contribution}</span></div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1" variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6 mt-16">
            <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div><span className="font-medium text-slate-700">Name:</span> {driverProfile.name}</div>
                  <div><span className="font-medium text-slate-700">Email:</span> {driverProfile.email}</div>
                  <div><span className="font-medium text-slate-700">Phone:</span> {driverProfile.phone}</div>
                  <div><span className="font-medium text-slate-700">Gender:</span> {driverProfile.gender}</div>
                  <div><span className="font-medium text-slate-700">Car Number:</span> {driverProfile.carnumber}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Driver Dashboard</h1>
              <Badge className="bg-green-100 text-green-700 border-green-200">Welcome, {driverProfile.name || "Driver"}</Badge>
            </div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {dashboardStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-slate-700" />
                          </div>
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                          >
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                          <p className="text-sm font-medium text-slate-700">{stat.title}</p>
                          <p className="text-xs text-slate-500">{stat.change}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Ride History Table */}
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Ride History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left table-auto">
                    <thead>
                      <tr className="text-slate-600 text-sm border-b border-slate-200/50">
                        <th className="py-2 px-4">Pickup</th>
                        <th className="py-2 px-4">Destination</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showAllRides
                        ? offeredRides.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
                        : offeredRides.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
                      ).map((ride) => {
                        const rideStatus = getRideStatus(ride);
                        return (
                          <tr key={ride._id} className="border-b border-slate-200/30 last:border-b-0">
                            <td className="py-3 px-4 text-slate-800 font-medium">{ride.from}</td>
                            <td className="py-3 px-4 text-slate-800 font-medium">{ride.to}</td>
                            <td className="py-3 px-4 text-slate-600 text-sm">{new Date(ride.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`text-xs px-2 py-1 ${
                                  rideStatus.status === "Completed"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : rideStatus.status === "Upcoming"
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                }`}
                              >
                                {rideStatus.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right text-slate-800 font-semibold">₹{ride.contribution}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {offeredRides.length > 5 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
                      onClick={() => setShowAllRides((prev) => !prev)}
                    >
                      {showAllRides ? "Hide" : "View All Rides"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  // Load rides when component mounts or when activeSection changes to "my-rides"
  useEffect(() => {
    fetchOfferedRides();
  }, []);

  const prevOfferedRidesRef = useRef([]);

  useEffect(() => {
    // Compare previous and current offeredRides to detect newly completed rides
    const prev = prevOfferedRidesRef.current;
    const newlyCompleted = offeredRides.filter(ride => {
      const prevRide = prev.find(r => r._id === ride._id);
      return ride.completed && (!prevRide || !prevRide.completed);
    });
    if (newlyCompleted.length > 0) {
      setNotifications(prevNotifs => [
        ...newlyCompleted.map(ride => ({
          id: ride._id,
          type: "success",
          title: "Ride Completed",
          message: `Your ride from ${ride.from} to ${ride.to} has been marked as completed!`,
          timestamp: new Date().toLocaleString(),
          read: false,
        })),
        ...prevNotifs,
      ]);
    }
    prevOfferedRidesRef.current = offeredRides;
  }, [offeredRides]);

  const [driverProfile, setDriverProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    carnumber: ""
  });

  useEffect(() => {
    // Try to get from sessionStorage (set this on login/register)
    const driver = JSON.parse(sessionStorage.getItem("driver")) || {};
    setDriverProfile({
      name: driver.name || "",
      email: driver.email || "",
      phone: driver.phone || "",
      gender: driver.gender || "",
      carnumber: driver.carnumber || ""
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and text removed */}
          {/* Navigation */}
          <nav className="flex-1 p-4 mt-18">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                const unreadCount = item.id === "notifications" ? notifications.filter((n) => !n.read).length : 0

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "text-slate-700 hover:bg-white/50 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1 ml-auto">{unreadCount}</Badge>
                    )}
                  </button>
                )
              })}
            </div>
          </nav>
          {/* Logout */}
          <div className="p-4 border-t border-white/50">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b border-white/50">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white/50 transition-colors">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800">CoGo Rider</span>
          </div>
        </div>

        {/* Content */}
        <main className="p-6 lg:p-8">{renderMainContent()}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}