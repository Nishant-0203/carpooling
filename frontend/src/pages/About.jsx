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
    { number: "50K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "₹2M+", label: "Money Saved", icon: <DollarSign className="w-6 h-6" /> },
    { number: "100K+", label: "Rides Completed", icon: <Globe className="w-6 h-6" /> },
    { number: "500T", label: "CO₂ Reduced", icon: <Leaf className="w-6 h-6" /> },
  ];

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Environmental Impact",
      description:
        "We're committed to reducing carbon emissions by promoting shared transportation and sustainable mobility solutions.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description:
        "Building strong connections between commuters and fostering a sense of community through shared journeys.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety & Trust",
      description:
        "Your safety is our priority. We implement rigorous verification processes and safety measures for all users.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Accessibility",
      description:
        "Making transportation affordable and accessible for everyone, regardless of their economic background.",
    },
  ];

  const team = [
    {
      name: "Arjun Mehta",
      role: "CEO & Co-Founder",
      bio: "Former Uber executive with 10+ years in mobility solutions",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Priya Sharma",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in AI and machine learning",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Operations",
      bio: "Transportation industry veteran with expertise in logistics",
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Sneha Patel",
      role: "Head of Design",
      bio: "Award-winning UX designer focused on mobility experiences",
      avatar: "/placeholder.svg?height=120&width=120",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />

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
              Revolutionizing{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Urban Mobility
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              RideSphere was born from a simple idea: make commuting more sustainable, affordable, and social. We're
              building the future of shared transportation, one ride at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
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
                Creating a More{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Sustainable Future
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Our mission is to transform urban transportation by connecting people who share similar routes, reducing
                traffic congestion, lowering carbon emissions, and making commuting more affordable for everyone.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe that by bringing people together through shared rides, we can create stronger communities
                while protecting our environment for future generations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border-white/30 rounded-3xl p-8">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                        <Target className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Vision 2030</h3>
                      <p className="text-sm text-slate-600">1M+ daily active users across India</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                        <Award className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Impact Goal</h3>
                      <p className="text-sm text-slate-600">50% reduction in single-occupancy vehicles</p>
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
              The principles that guide everything we do at RideSphere
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
              The passionate individuals working to revolutionize urban transportation
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
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 text-center hover:bg-white/50 transition-all duration-300 group">
                  <CardContent className="p-0">
                    <Avatar className="w-24 h-24 mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
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
              From a simple idea to transforming urban mobility across India
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
                  year: "2022",
                  title: "The Beginning",
                  description:
                    "Founded by transportation enthusiasts who experienced the daily struggle of expensive and inefficient commuting in Bangalore.",
                },
                {
                  year: "2023",
                  title: "First Launch",
                  description:
                    "Launched our MVP in Bangalore with 1,000 beta users. Achieved 85% user satisfaction rate within the first month.",
                },
                {
                  year: "2024",
                  title: "Rapid Growth",
                  description:
                    "Expanded to 5 major cities across India. Reached 50,000+ active users and facilitated over 100,000 successful rides.",
                },
                {
                  year: "2025",
                  title: "Future Vision",
                  description:
                    "Planning to expand to 25+ cities and introduce electric vehicle partnerships to further reduce our environmental impact.",
                },
              ].map((milestone, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-8">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg px-4 py-2">
                            {milestone.year}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-3">{milestone.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                        </div>
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
