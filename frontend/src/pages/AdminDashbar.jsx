"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Car,
  MessageSquare,
  Bell,
  LogOut,
  Menu,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  UserPlus,
  Navigation,
  Eye,
  MoreVertical,
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

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New user registration",
      message: "John Doe has registered as a new driver",
      timestamp: "2 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Ride completion milestone",
      message: "Platform has reached 100,000 completed rides",
      timestamp: "1 hour ago",
      type: "success",
      read: false,
    },
    {
      id: 3,
      title: "Payment issue reported",
      message: "User reported payment failure for ride #12345",
      timestamp: "3 hours ago",
      type: "alert",
      read: true,
    },
    {
      id: 4,
      title: "New contact message",
      message: "Support request from premium user",
      timestamp: "5 hours ago",
      type: "info",
      read: false,
    },
    {
      id: 5,
      title: "System maintenance scheduled",
      message: "Scheduled maintenance on Sunday 2 AM - 4 AM",
      timestamp: "1 day ago",
      type: "info",
      read: true,
    },
  ]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "rides", label: "Rides", icon: Car },
    { id: "messages", label: "Contact Messages", icon: MessageSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const dashboardStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+15 this week",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Rides",
      value: "98,234",
      change: "+1,234 this month",
      icon: Car,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "Requires attention",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Unread Requests",
      value: "8",
      change: "New messages",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
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

      case "users":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Users Management</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0 text-center">
                <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Users Management</h3>
                <p className="text-slate-600">User management features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "rides":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Rides Management</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0 text-center">
                <Car className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Rides Management</h3>
                <p className="text-slate-600">Ride management features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "messages":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Contact Messages</h1>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
              <CardContent className="p-0 text-center">
                <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Contact Messages</h3>
                <p className="text-slate-600">Message management features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
              <Badge className="bg-green-100 text-green-700 border-green-200">Live Data</Badge>
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

            {/* Recent Activity */}
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: "New user registered", user: "John Doe", time: "2 minutes ago", type: "user" },
                    { action: "Ride completed", user: "Ride #12345", time: "15 minutes ago", type: "ride" },
                    { action: "Payment processed", user: "₹1,250", time: "1 hour ago", type: "payment" },
                    { action: "Support ticket created", user: "Ticket #789", time: "2 hours ago", type: "support" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/30 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        {activity.type === "user" && <UserPlus className="w-4 h-4 text-white" />}
                        {activity.type === "ride" && <Car className="w-4 h-4 text-white" />}
                        {activity.type === "payment" && <TrendingUp className="w-4 h-4 text-white" />}
                        {activity.type === "support" && <MessageSquare className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-xs text-slate-600">{activity.user}</p>
                      </div>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  ))}
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
              <p className="text-sm text-slate-600">Admin Panel</p>
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
            <span className="font-bold text-slate-800">RideSphere Admin</span>
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