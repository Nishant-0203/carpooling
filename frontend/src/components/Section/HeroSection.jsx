import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
  const locationOptions = [
  // Chandigarh & Tricity
  "Chandigarh, Chandigarh, India",
  "Chandigarh Airport, Chandigarh, India",
  "Chandigarh Railway Station, Chandigarh, India",
  "Sector 17, Chandigarh, India",
  "Sector 43, Chandigarh, India",
  "Panchkula, Haryana, India",
  "Mohali, Punjab, India",
  "Zirakpur, Punjab, India",
  "Manimajra, Chandigarh, India",
  "IT Park, Chandigarh, India",

  // Delhi NCR
  "New Delhi, Delhi, India",
  "Old Delhi, Delhi, India",
  "Delhi Airport (IGI), Delhi, India",
  "Delhi Railway Station, Delhi, India",
  "Connaught Place, Delhi, India",
  "Saket, Delhi, India",
  "Noida, Uttar Pradesh, India",
  "Greater Noida, Uttar Pradesh, India",
  "Gurgaon, Haryana, India",
  "Faridabad, Haryana, India",
  "Ghaziabad, Uttar Pradesh, India",

  // Mumbai Metropolitan Region
  "Mumbai, Maharashtra, India",
  "Mumbai Airport (BOM), Maharashtra, India",
  "Mumbai Central Railway Station, Maharashtra, India",
  "Andheri, Maharashtra, India",
  "Bandra, Maharashtra, India",
  "Borivali, Maharashtra, India",
  "Navi Mumbai, Maharashtra, India",
  "Thane, Maharashtra, India",

  // Bangalore
  "Bengaluru, Karnataka, India",
  "Bangalore Airport (BLR), Karnataka, India",
  "Majestic Bus Stand, Karnataka, India",
  "KR Puram, Karnataka, India",
  "Electronic City, Karnataka, India",
  "Whitefield, Karnataka, India",

  // Hyderabad
  "Hyderabad, Telangana, India",
  "Hyderabad Airport (RGIA), Telangana, India",
  "Secunderabad, Telangana, India",
  "Gachibowli, Telangana, India",
  "Hitech City, Telangana, India",

  // Kolkata
  "Kolkata, West Bengal, India",
  "Howrah Railway Station, West Bengal, India",
  "Sealdah Railway Station, West Bengal, India",
  "Kolkata Airport (CCU), West Bengal, India",
  "Salt Lake City, West Bengal, India",

  // Chennai
  "Chennai, Tamil Nadu, India",
  "Chennai Airport (MAA), Tamil Nadu, India",
  "Chennai Central Railway Station, Tamil Nadu, India",
  "T Nagar, Tamil Nadu, India",
  "Velachery, Tamil Nadu, India",

  // Pune
  "Pune, Maharashtra, India",
  "Shivajinagar, Maharashtra, India",
  "Pune Railway Station, Maharashtra, India",
  "Hinjewadi, Maharashtra, India",
  "Kothrud, Maharashtra, India",

  // Jaipur
  "Jaipur, Rajasthan, India",
  "Jaipur Railway Station, Rajasthan, India",
  "Jaipur Airport (JAI), Rajasthan, India",
  "Malviya Nagar, Rajasthan, India",

  // Lucknow
  "Lucknow, Uttar Pradesh, India",
  "Charbagh Railway Station, Uttar Pradesh, India",
  "Hazratganj, Uttar Pradesh, India",

  // Ahmedabad
  "Ahmedabad, Gujarat, India",
  "Ahmedabad Airport (AMD), Gujarat, India",
  "Sabarmati, Gujarat, India",
  "Maninagar, Gujarat, India",

  // Bhopal & Central India
  "Bhopal, Madhya Pradesh, India",
  "Habibganj Railway Station, Madhya Pradesh, India",
  "Indore, Madhya Pradesh, India",
  "Raipur, Chhattisgarh, India",
  "Nagpur, Maharashtra, India",
  "Jabalpur, Madhya Pradesh, India",

  // North East India
  "Guwahati, Assam, India",
  "Dispur, Assam, India",
  "Shillong, Meghalaya, India",
  "Agartala, Tripura, India",
  "Kohima, Nagaland, India",

  // Hill Stations
  "Shimla, Himachal Pradesh, India",
  "Manali, Himachal Pradesh, India",
  "Dharamshala, Himachal Pradesh, India",
  "Nainital, Uttarakhand, India",
  "Mussoorie, Uttarakhand, India",
  "Ooty, Tamil Nadu, India",
  "Munnar, Kerala, India",
  "Darjeeling, West Bengal, India",
  "Gangtok, Sikkim, India",

  // Goa
  "Goa, Goa, India",
  "Panaji, Goa, India",
  "Vasco da Gama, Goa, India",
  "Madgaon Railway Station, Goa, India",

  // Other major cities
  "Varanasi, Uttar Pradesh, India",
  "Patna, Bihar, India",
  "Ranchi, Jharkhand, India",
  "Jamshedpur, Jharkhand, India",
  "Kanpur, Uttar Pradesh, India",
  "Agra, Uttar Pradesh, India",
  "Amritsar, Punjab, India",
  "Ludhiana, Punjab, India",
  "Surat, Gujarat, India",
  "Rajkot, Gujarat, India",
  "Coimbatore, Tamil Nadu, India",
  "Madurai, Tamil Nadu, India",
  "Vijayawada, Andhra Pradesh, India",
  "Visakhapatnam, Andhra Pradesh, India",
  "Trivandrum, Kerala, India",
  "Kochi, Kerala, India",
  "Ernakulam, Kerala, India"
];

const [fromSuggestions, setFromSuggestions] = useState([]);
const [toSuggestions, setToSuggestions] = useState([]);
const navigate = useNavigate();

const handleOfferRide = () => {
    navigate("/OfferRide"); // ✅ Replace with your actual route
  };

const handleFromChange = (value) => {
  setFromLocation(value);
  setFromSuggestions(
    locationOptions.filter((loc) =>
      loc.toLowerCase().startsWith(value.toLowerCase())
    )
  );
};

const handleToChange = (value) => {
  setToLocation(value);
  setToSuggestions(
    locationOptions.filter((loc) =>
      loc.toLowerCase().startsWith(value.toLowerCase())
    )
  );
};
const handleSubmitRide = () => {
  navigate("/rides", {
    state: {
      fromLocation,
      toLocation,
      date: date ? date.toISOString().split('T')[0] : null,
      time,
      transportMode,
    },
  });
};

const handleSuggestionClick = (value, type) => {
  if (type === "from") {
    setFromLocation(value);
    setFromSuggestions([]);
    document.getElementById("from-input")?.blur(); // blur the input to stop re-triggering
  } else {
    setToLocation(value);
    setToSuggestions([]);
    document.getElementById("to-input")?.blur(); // same for 'to'
  }
};

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
                <div className="relative">
  <Input
  id="from-input"
    placeholder="Enter pickup location"
    value={fromLocation}
    onChange={(e) => handleFromChange(e.target.value)}
    className="glass border-white/20 text-white placeholder:text-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
  />
  {fromSuggestions.length > 0 && (
    <ul className="absolute z-20 bg-white text-black w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
      {fromSuggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-cyan-100 cursor-pointer"
          onClick={() => handleSuggestionClick(suggestion, "from")}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>

              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">To</label>
                <div className="relative">
  <Input
    id="to-input"
    placeholder="Enter destination"
    value={toLocation}
    onChange={(e) => handleToChange(e.target.value)}
    className="glass border-white/20 text-white placeholder:text-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
  />
  {toSuggestions.length > 0 && (
    <ul className="absolute z-20 bg-white text-black w-full mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
      {toSuggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-cyan-100 cursor-pointer"
          onClick={() => handleSuggestionClick(suggestion, "to")}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>

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
                    className="glass border-white/20 text-white placeholder:text-gray-300 focus:border-cyan-400 focus:ring-cyan-400 pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Transport Mode */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-gray-300">Transport Mode</label>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger className="glass border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400">
                  <SelectValue placeholder="Select transport mode" />
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
  disabled={
    !fromLocation.trim() ||
    !toLocation.trim() ||
    !date ||
    !time ||
    !transportMode
  }
  className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold py-4 text-lg glow-cyan hover:glow-purple transition-all duration-300"
  onClick={handleSubmitRide}
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
            onClick={handleOfferRide} // ✅ Attach handler here
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
