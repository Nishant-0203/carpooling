"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFeedback({ type: "success", message: "Thank you for reaching out! Your message has been sent successfully. Our team will get back to you soon." });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setFeedback({ type: "error", message: "Oops! Something went wrong. Please try again or contact us through another channel." });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error. Please check your connection and try again." });
    }
    setLoading(false);
  };
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Drop us an email and our team will respond within 24 hours.",
      contact: "support@cogo.com",
      action: "Send Email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Support",
      description: "Speak directly with our support team for urgent queries.",
      contact: "+91 80-4567-8900",
      action: "Call Now",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time for instant assistance.",
      contact: "Available 9 AM - 9 PM IST",
      action: "Start Chat",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Help Center",
      description: "Browse FAQs and guides for quick solutions.",
      contact: "Comprehensive support articles",
      action: "Visit Help Center",
    },
  ];

  const offices = [
    {
      city: "Bangalore",
      address: "WeWork, Prestige Atlanta, 80 Feet Rd, Koramangala",
      phone: "+91 80-4567-8900",
      email: "bangalore@cogo.com",
    },
    {
      city: "Mumbai",
      address: "Regus, Bandra Kurla Complex, G Block",
      phone: "+91 22-4567-8900",
      email: "mumbai@cogo.com",
    },
    {
      city: "Delhi",
      address: "91springboard, Connaught Place, New Delhi",
      phone: "+91 11-4567-8900",
      email: "delhi@cogo.com",
    },
  ];

  const supportCategories = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Account & Profile",
      description: "Help with registration, profile updates, or verification.",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Rides & Bookings",
      description: "Assistance with finding rides, booking, or cancellations.",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Payments & Billing",
      description: "Questions about payments, refunds, or billing.",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Technical Support",
      description: "Report bugs or get help with technical issues.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Carpooling Contact Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
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
              Contact <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CoGo</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have a question, feedback, or need help? Our team is here to support your carpooling journey across India. Reach out and we’ll get back to you as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {contactMethods.map((method, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 text-center hover:bg-white/50 transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{method.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{method.description}</p>
                    <p className="text-sm font-medium text-slate-700 mb-4">{method.contact}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-blue-200 hover:bg-blue-50 bg-transparent"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl p-8">
                <CardContent className="p-0">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                  {feedback && (
                    <div
                      className={`mb-4 p-3 rounded-xl text-center ${
                        feedback.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {feedback.message}
                    </div>
                  )}
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name</label>
                        <Input
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                        <Input
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number (optional)"
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 ${!date ? "text-slate-600" : "text-black"}`}
                          >
                            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                            {date ? new Date(date).toLocaleDateString() : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date ? new Date(date) : undefined}
                            onSelect={d => setDate(d ? d.toISOString().split('T')[0] : "")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Subject</label>
                      <Input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12 placeholder:text-slate-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Message</label>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your inquiry..."
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl min-h-[120px] resize-none placeholder:text-slate-600"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Support Categories */}
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">How can we assist you?</h3>
                  <div className="space-y-4">
                    {supportCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/30 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-1">
                          {category.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-1">{category.title}</h4>
                          <p className="text-sm text-slate-600">{category.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Business Hours */}
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">Support Hours</h3>
                  </div>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200 mt-4">
                    Emergency support available 24/7
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Office Locations */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Offices</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Visit CoGo at any of our locations across India.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {offices.map((office, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 hover:bg-white/50 transition-all duration-300 h-full">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-4">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">{office.city}</h3>
                    <div className="space-y-3 text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <p className="text-sm">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm">{office.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm">{office.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find quick answers to common questions about carpooling with CoGo.
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  question: "How quickly do you respond?",
                  answer:
                    "We typically respond to emails within 24 hours and live chat within minutes during support hours.",
                },
                {
                  question: "Do you offer phone support?",
                  answer: "Yes! Our phone support is available Monday-Friday 9 AM to 9 PM IST for urgent matters.",
                },
                {
                  question: "Can I schedule a demo?",
                  answer: "Contact our team to schedule a personalized demo of CoGo's features.",
                },
                {
                  question: "Where are you located?",
                  answer: "We have offices in Bangalore, Mumbai, and Delhi. See our locations section for details.",
                },
              ].map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 h-full">
                    <CardContent className="p-0">
                      <h3 className="font-semibold text-slate-800 mb-3">{faq.question}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
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
