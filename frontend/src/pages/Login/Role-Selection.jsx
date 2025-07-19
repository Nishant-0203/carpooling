"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Carpooling Role Selection" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CoGo</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Choose your role to join our carpooling community. Whether you're offering rides or looking for a lift, we've got you covered.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Driver Card */}
            <motion.div
              className="block cursor-pointer h-full"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate("/Driver-register")}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8 text-center h-full flex flex-col justify-center">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Driver</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Access the Driveristrative dashboard to manage users, rides, and platform settings.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

          {/* User Card */}
            <motion.div
              className="block cursor-pointer h-full"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate("/Register")}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8 text-center h-full flex flex-col justify-center">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    <Users className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">User</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Find and offer rides, manage your bookings, and connect with other commuters.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
