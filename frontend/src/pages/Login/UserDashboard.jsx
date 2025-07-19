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
} from "lucide-react";

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

export default function UserDashboard() {
  const navigate = useNavigate();

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  // Booked rides state
  const [bookedRides, setBookedRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllRides, setShowAllRides] = useState(false);
  const [viewRide, setViewRide] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Sidebar
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  // Sidebar items
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "book-ride", label: "Book a Ride", icon: BookOpen },
    { id: "my-bookings", label: "My Bookings", icon: Car },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  // Dashboard stats
  const dashboardStats = [
    {
      title: "Total Rides Booked",
      value: bookedRides.length.toString(),
      change: "+2 this month",
      icon: Car,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Upcoming Rides",
      value: bookedRides.filter(ride => !ride.completed).length.toString(),
      change: "Awaiting travel",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completed Rides",
      value: bookedRides.filter(ride => ride.completed).length.toString(),
      change: "Total completed",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spent",
      value: `₹${bookedRides.reduce((sum, ride) => sum + (ride.contribution || 0), 0)}`,
      change: "Expected spend",
      icon: Wallet,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Fetch user profile from backend using JWT token
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        // fallback to sessionStorage user
        const fallbackUser1 = JSON.parse(sessionStorage.getItem("user")) || {};
        setUserProfile({
          name: fallbackUser1.name || "",
          email: fallbackUser1.email || "",
          phone: fallbackUser1.phone || "",
          gender: fallbackUser1.gender || "",
        });
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            gender: data.gender || "",
          });
        } else {
          // fallback to sessionStorage user
          const fallbackUser2 = JSON.parse(sessionStorage.getItem("user")) || {};
          setUserProfile({
            name: fallbackUser2.name || "",
            email: fallbackUser2.email || "",
            phone: fallbackUser2.phone || "",
            gender: fallbackUser2.gender || "",
          });
        }
      } catch (err) {
        // fallback to sessionStorage user
        const fallbackUser3 = JSON.parse(sessionStorage.getItem("user")) || {};
        setUserProfile({
          name: fallbackUser3.name || "",
          email: fallbackUser3.email || "",
          phone: fallbackUser3.phone || "",
          gender: fallbackUser3.gender || "",
        });
      }
    };
    fetchProfile();
  }, []);

  // Fetch booked rides (replace with real API call)
  const fetchBookedRides = async () => {
    setLoading(true);
    try {
      // const userId = sessionStorage.getItem("userId");
      // const response = await fetch(`http://localhost:5000/api/bookings/my-bookings?userId=${userId}`);
      // const data = await response.json();
      // setBookedRides(data);
      // For now, use placeholder data:
      setBookedRides([
        {
          _id: "1",
          from: "Chandigarh",
          to: "Delhi",
          date: "2024-06-10",
          time: "09:00",
          passengers: 1,
          transport: "Car",
          contribution: 500,
          completed: false,
        },
        {
          _id: "2",
          from: "Delhi",
          to: "Agra",
          date: "2024-05-20",
          time: "14:00",
          passengers: 2,
          transport: "Car",
          contribution: 800,
          completed: true,
        },
      ]);
    } catch (error) {
      setBookedRides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedRides();
  }, []);

  // Notifications (localStorage)
  useEffect(() => {
    const savedNotifs = localStorage.getItem('userNotifications');
    if (savedNotifs) {
      setNotifications(JSON.parse(savedNotifs));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif));
      localStorage.setItem('userNotifications', JSON.stringify(updated));
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
      return { status: "Upcoming", color: "bg-yellow-100 text-yellow-700" };
    }
  };

  // Main content renderer
  const renderMainContent = () => {
    switch (activeSection) {
      case "notifications":
        return (
          <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>
              <Button
                variant="outline"
                className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
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
        );
      case "my-bookings":
        return (
          <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">My Bookings</h1>
              <Button
                onClick={fetchBookedRides}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
              >
                Refresh Bookings
              </Button>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading your bookings...</p>
              </div>
            ) : bookedRides.length === 0 ? (
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
                <CardContent className="p-0 text-center">
                  <Car className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Bookings Yet</h3>
                  <p className="text-slate-600 mb-4">Start booking rides to travel conveniently!</p>
                  <Button
                    onClick={() => setActiveSection("book-ride")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
                  >
                    Book Your First Ride
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {bookedRides
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
                                onClick={() => { setViewRide(ride); setShowViewModal(true); }}
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
            )}
            {/* View Ride Modal */}
            {showViewModal && viewRide && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl relative">
                  <button className="absolute top-3 right-3 text-xl" onClick={() => setShowViewModal(false)}>&times;</button>
                  <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                  <div className="space-y-2">
                    <div><strong>From:</strong> {viewRide.from}</div>
                    <div><strong>To:</strong> {viewRide.to}</div>
                    <div><strong>Date:</strong> {formatDate(viewRide.date)}</div>
                    <div><strong>Time:</strong> {formatTime(viewRide.time)}</div>
                    <div><strong>Passengers:</strong> {viewRide.passengers}</div>
                    <div><strong>Transport:</strong> {viewRide.transport}</div>
                    <div><strong>Contribution:</strong> ₹{viewRide.contribution}</div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1" variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6 mt-16">
            <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div><span className="font-medium text-slate-700">Name:</span> {userProfile.name}</div>
                  <div><span className="font-medium text-slate-700">Email:</span> {userProfile.email}</div>
                  <div><span className="font-medium text-slate-700">Phone:</span> {userProfile.phone}</div>
                  <div><span className="font-medium text-slate-700">Gender:</span> {userProfile.gender}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">User Dashboard</h1>
              <Badge className="bg-green-100 text-green-700 border-green-200">Welcome, {userProfile.name || "User"}</Badge>
            </div>
            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
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
                );
              })}
            </motion.div>
            {/* Booking History Table */}
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Bookings</h2>
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
                        ? bookedRides.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
                        : bookedRides.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
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
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
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
                {bookedRides.length > 5 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent"
                      onClick={() => setShowAllRides((prev) => !prev)}
                    >
                      {showAllRides ? "Hide" : "View All Bookings"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  // Main return
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-white/50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-white/50">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">CoGo</h1>
              <p className="text-sm text-slate-600">User Panel</p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const unreadCount = item.id === "notifications" ? notifications.filter((n) => !n.read).length : 0;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
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
                );
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
            <span className="font-bold text-slate-800">CoGo User</span>
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
  );
}
