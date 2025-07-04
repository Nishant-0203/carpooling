"use client";
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

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@ridesphere.com",
      action: "Send Email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "+91 80-4567-8900",
      action: "Call Now",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 9 PM",
      action: "Start Chat",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Help Center",
      description: "Browse our knowledge base",
      contact: "200+ articles available",
      action: "Visit Help Center",
    },
  ];

  const offices = [
    {
      city: "Bangalore",
      address: "WeWork, Prestige Atlanta, 80 Feet Rd, Koramangala",
      phone: "+91 80-4567-8900",
      email: "bangalore@ridesphere.com",
    },
    {
      city: "Mumbai",
      address: "Regus, Bandra Kurla Complex, G Block",
      phone: "+91 22-4567-8900",
      email: "mumbai@ridesphere.com",
    },
    {
      city: "Delhi",
      address: "91springboard, Connaught Place, New Delhi",
      phone: "+91 11-4567-8900",
      email: "delhi@ridesphere.com",
    },
  ];

  const supportCategories = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Account & Profile",
      description: "Issues with registration, profile updates, verification",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Rides & Booking",
      description: "Help with finding rides, booking issues, cancellations",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Payments & Billing",
      description: "Payment problems, refunds, billing questions",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Technical Support",
      description: "App issues, bugs, technical difficulties",
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
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Touch</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're here to help! Reach out to us through any of the channels below and we'll get back to you as soon as
              possible.
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
            whileInView="animate"
            viewport={{ once: true }}
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
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">Send us a Message</h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">First Name</label>
                        <Input
                          placeholder="Enter your first name"
                          className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                        <Input
                          placeholder="Enter your last name"
                          className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Subject</label>
                      <Input
                        placeholder="What's this about?"
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Message</label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        className="bg-white/80 border-white/50 backdrop-blur-sm rounded-xl min-h-[120px] resize-none"
                      />
                    </div>

                    <Button className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Send Message
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
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">What can we help you with?</h3>
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
                    <h3 className="text-xl font-semibold text-slate-800">Business Hours</h3>
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
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Visit us at any of our locations across India</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Quick Answers</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions before reaching out
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
                    "We typically respond to emails within 24 hours and live chat within minutes during business hours.",
                },
                {
                  question: "Do you offer phone support?",
                  answer: "Yes! Our phone support is available Monday-Friday 9 AM to 9 PM IST for urgent matters.",
                },
                {
                  question: "Can I schedule a demo?",
                  answer: "Contact our sales team to schedule a personalized demo of RideSphere's features.",
                },
                {
                  question: "Where are you located?",
                  answer: "We have offices in Bangalore, Mumbai, and Delhi. Visit our locations section for addresses.",
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
