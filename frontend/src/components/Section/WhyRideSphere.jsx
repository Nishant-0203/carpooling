import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Shield, Users, MapPin, Star } from 'lucide-react';

const WhyCoGo = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Eco-Friendly Travel',
      description: 'Reduce your carbon footprint by sharing rides and contributing to a cleaner environment.',
      color: 'from-green-400 to-teal-500',
      glow: 'glow-mint',
    },
    {
      icon: Shield,
      title: 'Verified Drivers',
      description: 'All our drivers go through strict verification processes to ensure your safety and security.',
      color: 'from-blue-400 to-cyan-500',
      glow: 'glow-cyan',
    },
    {
      icon: Star,
      title: 'Secure Payments',
      description: 'Your transactions are protected with end-to-end encryption and secure payment gateways.',
      color: 'from-purple-400 to-pink-500',
      glow: 'glow-purple',
    },
    {
      icon: Users,
      title: 'Live Location Sharing',
      description: 'Share your trip details with family and friends for added peace of mind during your journey.',
      color: 'from-orange-400 to-red-500',
      glow: 'glow-cyan',
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Riders' },
    { number: '15K+', label: 'Verified Drivers' },
    { number: '100+', label: 'Cities Covered' },
    { number: '99.9%', label: 'Safety Rating' },
  ];

  return (
    <section id="why-cogo" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why CoGo?
          </h2>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Experience the future of shared transportation with our premium features designed for modern travelers
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className={`relative h-full glass-strong p-8 group hover:${feature.glow} transition-all duration-500 neumorphic border-white/10`}>
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`h-1 rounded-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>

                {/* Background Icon */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <feature.icon className="w-24 h-24 text-white" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                {stat.number}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCoGo;
