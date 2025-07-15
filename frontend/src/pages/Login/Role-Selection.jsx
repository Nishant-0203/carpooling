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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Choose Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Role</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Select your role to proceed to the appropriate login or registration page.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Admin Card */}
            <motion.div
              className="block cursor-pointer h-full"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate("/admin-register")}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8 text-center h-full flex flex-col justify-center">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Admin</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Access the administrative dashboard to manage users, rides, and platform settings.
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
