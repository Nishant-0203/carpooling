import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Star } from 'lucide-react';

const LiveRides = () => {
  const rides = [
    {
      id: 1,
      from: 'Downtown',
      to: 'Airport',
      driver: 'Sarah M.',
      rating: 4.9,
      seatsLeft: 2,
      time: '2:30 PM',
      price: '$15',
      transport: '🚗',
      verified: true
    },
    {
      id: 2,
      from: 'Tech Park',
      to: 'Mall District',
      driver: 'Mike R.',
      rating: 4.8,
      seatsLeft: 1,
      time: '3:15 PM',
      price: '$8',
      transport: '🏍️',
      verified: true
    },
    {
      id: 3,
      from: 'University',
      to: 'City Center',
      driver: 'Lisa K.',
      rating: 5.0,
      seatsLeft: 3,
      time: '4:00 PM',
      price: '$12',
      transport: '🚗',
      verified: true
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Rides</span>
          </h2>
          <p className="text-xl text-gray-300 font-light">
            Join these rides happening right now
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-strong p-8 h-full neumorphic">
              <h3 className="text-xl font-semibold text-white mb-6">Active Routes</h3>

              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 h-80 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-cyan-400/20"></div>
                    ))}
                  </div>
                </div>

                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="routeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="routeGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#98FB98" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <path d="M50 250 Q150 150 250 100" stroke="url(#routeGradient1)" strokeWidth="3" fill="none" />
                  <path d="M100 300 Q200 200 300 150" stroke="url(#routeGradient2)" strokeWidth="3" fill="none" />
                </svg>

                <div className="absolute top-6 left-12">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse glow-cyan"></div>
                </div>
                <div className="absolute top-20 right-16">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse glow-purple"></div>
                </div>
                <div className="absolute bottom-16 left-20">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse glow-mint"></div>
                </div>
                <div className="absolute bottom-8 right-12">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse glow-cyan"></div>
                </div>

                <div className="absolute top-4 right-4 glass px-3 py-2 rounded-lg">
                  <span className="text-xs text-cyan-400">• Live Routes</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Available Rides */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {rides.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass-strong p-6 hover:glow-cyan transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{ride.transport}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">{ride.driver}</span>
                          {ride.verified && (
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-300">{ride.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyan-400">{ride.price}</div>
                      <div className="text-xs text-gray-400">{ride.seatsLeft} seats left</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{ride.from}</span>
                    </div>
                    <div className="text-gray-500">→</div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{ride.to}</span>
                    </div>
                    <div className="flex items-center space-x-1 ml-auto">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span>{ride.time}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white"
                  >
                    Join Ride
                  </Button>
                </Card>
              </motion.div>
            ))}

            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                View All Rides
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveRides;
