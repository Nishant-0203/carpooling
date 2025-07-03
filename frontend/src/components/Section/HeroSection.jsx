import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [transportMode, setTransportMode] = useState('');

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 px-4">
      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Ride.{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Your Way.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light leading-relaxed">
            Book or offer rides with precision.{' '}
            <span className="text-cyan-400">Door-to-door shared travel redefined.</span>
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Card className="glass-strong p-8 max-w-2xl mx-auto neumorphic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">From</label>
                <Input
                  placeholder="Enter pickup location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="glass border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">To</label>
                <Input
                  placeholder="Enter destination"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="glass border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal glass border-white/20 text-white hover:bg-white/10",
                        !date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass-strong border-white/20" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="glass border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400 pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Transport Mode */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-gray-300">Transport Mode</label>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger className="glass border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400">
                  <SelectValue placeholder="Choose your ride type" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/20">
                  <SelectItem value="car">🚗 Car</SelectItem>
                  <SelectItem value="bike">🏍️ Bike</SelectItem>
                  <SelectItem value="auto">🛺 Auto</SelectItem>
                  <SelectItem value="bus">🚌 Bus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold py-4 text-lg glow-cyan hover:glow-purple transition-all duration-300"
              >
                Find a Ride
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-gray-400 mb-4">Or become a driver and earn money</p>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:border-cyan-400"
          >
            Offer a Ride
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
