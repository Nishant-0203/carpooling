"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Leaf,
  Users,
  DollarSign,
  Shield,
  Target,
  Heart,
  Globe,
  Award,
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

export default function About() {
  const stats = [
    { number: "75K+", label: "Rides Shared", icon: <Globe className="w-6 h-6" /> },
    { number: "₹3M+", label: "Money Saved", icon: <DollarSign className="w-6 h-6" /> },
    { number: "120K+", label: "Users Connected", icon: <Users className="w-6 h-6" /> },
    { number: "800T", label: "CO₂ Saved", icon: <Leaf className="w-6 h-6" /> },
  ];

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />, // Could use a carpool icon if available
      title: "Eco-Friendly Travel",
      description:
        "Every shared ride means fewer cars on the road, less pollution, and a greener planet.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Connections",
      description:
        "We bring people together, making commutes more social and building lasting connections.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety & Trust",
      description:
        "All users are verified, and our platform prioritizes your safety every step of the way.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Affordable Journeys",
      description:
        "Share costs, save money, and make daily travel accessible for everyone.",
    },
  ];

  const team = [
    {
      name: "Arjun Mehta",
      role: "CEO & Co-Founder",
      bio: "Urban mobility expert passionate about sustainable commuting.",
      avatar: "/assets/team-arjun.jpg", // Replace with real image
    },
    {
      name: "Priya Sharma",
      role: "CTO & Co-Founder",
      bio: "Tech innovator with a vision for smarter, safer carpooling.",
      avatar: "/assets/team-priya.jpg", // Replace with real image
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Operations",
      bio: "Logistics specialist ensuring smooth rides for all.",
      avatar: "/assets/team-rajesh.jpg", // Replace with real image
    },
    {
      name: "Sneha Patel",
      role: "Head of Design",
      bio: "UX designer making carpooling delightful and easy to use.",
      avatar: "/assets/team-sneha.jpg", // Replace with real image
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Carpooling Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CoGo</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              CoGo is your trusted platform for sharing rides, saving money, and making commuting eco-friendly. Join a growing community of commuters making a difference—one shared ride at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm border-t border-b border-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 text-center">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">Our Mission</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Making Every Commute <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Smarter & Greener</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We connect drivers and passengers heading the same way, reducing traffic, pollution, and travel costs. Our mission is to make carpooling the preferred choice for daily travel.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Together, we’re building a future where every seat is filled, every journey is social, and every commute is sustainable.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border-white/30 rounded-3xl p-8 shadow-xl">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                        <Target className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Vision 2026</h3>
                      <p className="text-sm text-slate-600">2M+ daily rides shared nationwide</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                        <Award className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Impact Goal</h3>
                      <p className="text-sm text-slate-600">1B+ kg CO₂ saved by 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The values that drive our carpooling community forward
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8 h-full hover:bg-white/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The dedicated team making carpooling accessible and impactful
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 text-center hover:bg-white/50 transition-all duration-300 group shadow-lg">
                  <CardContent className="p-0">
                    <Avatar className="w-24 h-24 mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 border-4 border-blue-200 shadow">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Journey</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From a simple idea to a thriving carpooling community across the country
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  year: "January 2025",
                  title: "The Idea",
                  description:
                    "Started by commuters who wanted to make daily travel more affordable and eco-friendly by sharing rides in their city.",
                  icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a1.png", // Lightbulb emoji icon
                },
                {
                  year: "March 2025",
                  title: "First Rides Shared",
                  description:
                    "Launched our platform in one city, quickly growing to thousands of users sharing rides and saving money every day.",
                  icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f697.png", // Car emoji icon
                },
                {
                  year: "May 2025",
                  title: "Expanding Community",
                  description:
                    "Expanded to multiple cities, helping tens of thousands of people reduce costs, traffic, and emissions through carpooling.",
                  icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f465.png", // Busts in silhouette emoji icon
                },
                {
                  year: "June 2025",
                  title: "Looking Ahead",
                  description:
                    "Aiming to connect even more commuters, partner with local organizations, and make carpooling the go-to choice for daily travel.",
                  icon: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png", // Rocket emoji icon
                },
              ].map((milestone, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8 flex items-center gap-6 shadow">
                    <CardContent className="p-0 flex items-center gap-6">
                      <img src={milestone.icon} alt={milestone.title} className="w-16 h-16 rounded-xl border border-blue-100 bg-blue-50 object-cover" />
                      <div>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg px-4 py-2 mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">{milestone.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
