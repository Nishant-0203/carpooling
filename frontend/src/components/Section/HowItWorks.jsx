import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Users, Car } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MapPin,
      title: 'Enter your details',
      description: 'Tell us where you want to go and when you need to travel',
      color: 'from-cyan-400 to-blue-500',
      glow: 'glow-cyan'
    },
    {
      icon: Users,
      title: 'Find matching rides',
      description: 'We connect you with verified drivers going your way',
      color: 'from-purple-400 to-pink-500',
      glow: 'glow-purple'
    },
    {
      icon: Car,
      title: 'Hop in and go!',
      description: 'Meet your driver, share the ride, and enjoy the journey',
      color: 'from-green-400 to-teal-500',
      glow: 'glow-mint'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-300 font-light">
            Get started in just three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <Card className={`h-full glass-strong p-8 text-center group hover:${step.glow} transition-all duration-500 neumorphic`}>
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6 pt-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                </div>
              </Card>

              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400/50 to-purple-500/50 transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
