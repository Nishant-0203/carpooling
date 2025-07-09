"use client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Car,
  Headphones,
  CheckCircle,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { redirect } from "react-router-dom";

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

export default function OfferRidePage() {
  const [fromLocation, setFromLocation] = useState("");
  const navigate = useNavigate();
  const [toLocation, setToLocation] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [modeOfTransport, setModeOfTransport] = useState("Car"); // default value
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

  const handleSuggestionClick = (value, type) => {
    if (type === "from") {
      setFromLocation(value);
      setFromSuggestions([]);
    } else {
      setToLocation(value);
      setToSuggestions([]);
    }
  };
  const handleSubmit = async () => {
    const rideData = {
  from: fromLocation,
  to: toLocation,
  date,
  time,
  transport: modeOfTransport,
  passengers,
  contribution,
};


    try {
      const response = await fetch("http://localhost:5000/api/ride/offerride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rideData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Ride published successfully!");
        // Optionally reset state
        setFrom("");
        setTo("");
        setPassengers(2);
        setContribution(200);
        navigate("/RideList");
      } else {
        alert("Failed to publish ride: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Jaipur");
  const [passengers, setPassengers] = useState(2);
  const [contribution, setContribution] = useState(200);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const testimonials = [
    {
      quote:
        "5 years of using RideSphere, dozens of journeys, as many meetings and exchanges, not a single disappointment. THANK YOU!",
      name: "Simon",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "Amazing platform! I've saved thousands while meeting wonderful people on my daily commute.",
      name: "Priya",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The best carpooling experience I've ever had. Safe, reliable, and cost-effective.",
      name: "Rajesh",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const faqs = [
    {
      question: "How do I set the passenger contribution for my ride?",
      answer:
        "We recommend a contribution per passenger equal to these suggestions help you set fair contributions for your ride. The most likely to get your seats filled is but can still be adjusted...",
    },
    {
      question: "When do I get my money?",
      answer:
        "We send your money 48 hours after the ride if you travelled as planned. You'll get your money 1 to 5 weekdays (not counting weekends and holidays) after we send it...",
    },
    {
      question: "What should I do if there's an error with my ride?",
      answer:
        "You should edit your ride as soon as you spot the error. If you can't edit your ride because passengers have already...",
    },
    {
      question: "How do I cancel a carpool ride as a driver of a ride?",
      answer:
        "It only takes a minute to cancel a listed ride. However, if a driver cannot fulfill a ride that has been already booked, it is their responsibility to cancel in a timely manner to allow the passenger...",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <div className="absolute inset-0 hero-grid opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                Become a RideSphere driver and{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  save on travel costs
                </span>{" "}
                by sharing your ride with passengers.
              </h1>

              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8 mb-6">
                <CardContent className="p-0">
                  <div className="space-y-6">
                    {/* From Field */}
                    <div className="relative">
                      <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <Input
                          placeholder="From"
                          value={fromLocation}
                          onChange={(e) => handleFromChange(e.target.value)}
                          className="border-0 bg-transparent text-slate-800 font-medium text-lg p-0 focus:ring-0"
                        />
                      </div>
                      {fromSuggestions.length > 0 && (
                        <ul className="absolute z-30 bg-white text-black w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                          {fromSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => handleSuggestionClick(suggestion, "from")}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* To Field */}
                    <div className="relative">
                      <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <Input
                          placeholder="To"
                          value={toLocation}
                          onChange={(e) => handleToChange(e.target.value)}
                          className="border-0 bg-transparent text-slate-800 font-medium text-lg p-0 focus:ring-0"
                        />
                      </div>
                      {toSuggestions.length > 0 && (
                        <ul className="absolute z-30 bg-white text-black w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                          {toSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              onClick={() => handleSuggestionClick(suggestion, "to")}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Date Input */}
<div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
  <Input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none"
  />
</div>

{/* Time Input */}
<div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
  <Input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none"
  />
</div>

{/* Mode of Transport */}
<div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
  <Car className="w-5 h-5 text-slate-600" />
  <select
    value={modeOfTransport}
    onChange={(e) => setModeOfTransport(e.target.value)}
    className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none"
  >
    {["Car", "Bike", "Auto", "Bus", "Taxi"].map((option) => (
      <option key={option} value={option} className="text-slate-800 bg-white">
        {option}
      </option>
    ))}
  </select>
</div>


                    {/* Passengers */}
                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50">
                      <Users className="w-5 h-5 text-slate-600" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="text-slate-800 bg-white">
                            {num} passenger{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Money Input */}
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50 mt-4">
                    <span className="text-green-600 text-xl font-bold">₹</span>
                    <Input
                      type="number"
                      placeholder="Contribution per passenger"
                      value={contribution}
                      onChange={(e) => setContribution(Number(e.target.value))}
                      className="bg-transparent border-0 text-slate-800 font-medium focus:outline-none w-[76%]"
                    />
                    <span className="text-slate-600">per passenger</span>
                  </div>

                  <div className="mt-8">
                    <div className="text-center mb-6">
                      <p className="text-lg text-slate-700 mb-2">
                        Save up to <span className="text-2xl font-bold text-blue-600">₹1,624</span>
                      </p>
                      <p className="text-slate-600">on your first ride.</p>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Publish a ride
                    </Button>

                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="w-full h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-3xl flex items-center justify-center">
                  <div className="relative">
                    <Car className="w-32 h-32 text-blue-600" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Drive. Share. Save. Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Drive. Share. Save.</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Drive.",
                description:
                  "Keep your plans! Hit the road just as you anticipated and make the most of your vehicle's empty seats.",
              },
              {
                title: "Share.",
                description: "Travel with good company. Share a memorable ride with travellers from all walks of life.",
              },
              {
                title: "Save.",
                description: "Split petrol, electricity... Easily divvy up all the costs with other passengers.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div className="text-center" {...fadeInUp}>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Join 21 million</h3>
              <p className="text-slate-600">drivers already using RideSphere</p>
            </motion.div>
            <motion.div className="text-center" {...fadeInUp} transition={{ delay: 0.1 }}>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">More than 100 million</h3>
              <p className="text-slate-600">BlaBlaCar members worldwide</p>
            </motion.div>
            <motion.div className="text-center" {...fadeInUp} transition={{ delay: 0.2 }}>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Over 40 million</h3>
              <p className="text-slate-600">rides shared per year</p>
            </motion.div>
          </div>

          {/* Testimonial */}
          <motion.div className="max-w-4xl mx-auto" {...fadeInUp}>
            <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8">
              <CardContent className="p-0">
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {testimonials.map((_, index) => (
                      <Avatar key={index} className="w-12 h-12 border-2 border-white">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                        <AvatarFallback>U{index + 1}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="flex-1">
                    <blockquote className="text-lg text-slate-700 mb-2 italic">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    <p className="text-slate-600 font-medium">{testimonials[currentTestimonial].name}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                      }
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Publish your ride in just minutes</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  number: "1.",
                  title: "Create a RideSphere account",
                  description:
                    "Add your profile picture, a few words about you and your phone number to increase trust between members.",
                },
                {
                  number: "2.",
                  title: "Publish your ride",
                  description:
                    "Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings.",
                },
                {
                  number: "3.",
                  title: "Accept booking requests",
                  description:
                    "Review passenger profiles and accept their requests to ride with you. That's how easy it is to start saving on travel costs!",
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-64 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl overflow-hidden flex flex-col">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Create your account on RideSphere</h3>
                    <div className="space-y-3">
                      <div className="w-full h-3 bg-white/20 rounded"></div>
                      <div className="w-3/4 h-3 bg-white/20 rounded"></div>
                      <div className="w-1/2 h-3 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white/10 m-4 rounded-xl"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">We're here every step of the way</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Headphones className="w-8 h-8" />,
                title: "At your service 24/7",
                description:
                  "Our team is at your disposal to answer any questions by email or social media. You can also have a live chat directly with customer service.",
              },
              {
                icon: <Car className="w-8 h-8" />,
                title: "RideSphere at your side",
                description:
                  "For just ₹5 benefit from the reimbursement of up to 1,500₹ of your excess when you publish a ride as a driver on RideSphere.",
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "100% secure information",
                description:
                  "Our team is dedicated to the protection of your data, which is always 100% confidential thanks to monitoring tools, secure servers and encrypted data.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/30 border-white/40 rounded-2xl p-6 text-center hover:bg-white/40 transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Help Center / FAQ */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Everything you need as a driver, in our Help Centre
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 h-full">
                    <CardContent className="p-0">
                      <h3 className="font-semibold text-slate-800 mb-3">{faq.question}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{faq.answer}</p>
                      <Button variant="link" className="text-blue-600 p-0 h-auto font-medium">
                        Read more
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 py-3">
                See more answers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center" {...fadeInUp}>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Publish a ride
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
