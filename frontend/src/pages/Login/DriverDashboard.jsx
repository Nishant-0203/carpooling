"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

export default function RiderDashboard() {
    const [profile, setProfile] = useState({
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
});
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

  if (profile.email) fetchProfile(); // Optional: fetch only if email exists
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Ride #RS1001 confirmed!",
      message: "Your ride from Koramangala to Electronic City is confirmed for 9:30 AM.",
      timestamp: "5 minutes ago",
      type: "success",
      read: false,
    },
    {
      id: 2,
      title: "New feature: Ride Credits",
      message: "Earn credits for every ride you complete. Check your wallet balance!",
      timestamp: "1 hour ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      title: "Ride #RS9876 cancelled",
      message: "Driver cancelled your ride from HSR Layout to Indiranagar.",
      timestamp: "3 hours ago",
      type: "alert",
      read: true,
    },
    {
      id: 4,
      title: "Profile update reminder",
      message: "Complete your profile for a better matching experience.",
      timestamp: "1 day ago",
      type: "info",
      read: false,
    },
  ]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "book-ride", label: "Book a Ride", icon: BookOpen },
    { id: "my-rides", label: "My Rides", icon: Car },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  const dashboardStats = [
    {
      title: "Total Rides Taken",
      value: "42",
      change: "+3 this month",
      icon: Car,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Upcoming Rides",
      value: "2",
      change: "Next ride tomorrow",
      icon: Clock,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cancelled Rides",
      value: "5",
      change: "Last month: 1",
      icon: XCircle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Ride Credits",
      value: "₹1,250",
      change: "Available balance",
      icon: Wallet,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const rideHistory = [
    { id: 1, pickup: "Koramangala", destination: "Electronic City", date: "2024-07-10", status: "Completed", price: "₹120" },
    { id: 2, pickup: "Whitefield", destination: "MG Road", date: "2024-07-08", status: "Completed", price: "₹80" },
    { id: 3, pickup: "HSR Layout", destination: "Indiranagar", date: "2024-07-05", status: "Cancelled", price: "₹60" },
    { id: 4, pickup: "Jayanagar", destination: "Banashankari", date: "2024-07-03", status: "Completed", price: "₹90" },
    { id: 5, pickup: "Marathahalli", destination: "Silk Board", date: "2024-07-01", status: "Completed", price: "₹70" },
  ];

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
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
const renderMainContent = () => {
    switch (activeSection) {
      case "notifications":
        return (
          <div className="space-y-6">
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
        )

      case "book-ride":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Book a Ride</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0 text-center">
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Book Your Next Ride</h3>
                <p className="text-slate-600">Ride booking features coming soon...</p>
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl">
                  Go to Search Rides
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "my-rides":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">My Rides</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0 text-center">
                <Car className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Your Ride History</h3>
                <p className="text-slate-600">Manage your past and upcoming rides here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "profile":
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Profile Settings</h1>
      <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
        <CardContent className="p-0">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              saveProfileToBackend();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-xl bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Rider Dashboard</h1>
              <Badge className="bg-green-100 text-green-700 border-green-200">Welcome, Rider!</Badge>
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
                      {rideHistory.map((ride) => (
                        <tr key={ride.id} className="border-b border-slate-200/30 last:border-b-0">
                          <td className="py-3 px-4 text-slate-800 font-medium">{ride.pickup}</td>
                          <td className="py-3 px-4 text-slate-800 font-medium">{ride.destination}</td>
                          <td className="py-3 px-4 text-slate-600 text-sm">
                            {new Date(ride.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`text-xs px-2 py-1 ${
                                ride.status === "Completed"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-red-100 text-red-700 border-red-200"
                              }`}
                            >
                              {ride.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right text-slate-800 font-semibold">{ride.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-50 bg-transparent">
                    View All Rides
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

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
              <h1 className="text-xl font-bold text-slate-800">RideSphere</h1>
              <p className="text-sm text-slate-600">Rider Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
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
            <span className="font-bold text-slate-800">RideSphere Rider</span>
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