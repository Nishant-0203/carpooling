import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Marketing Manager',
      avatar: '👩‍💼',
      rating: 5,
      text: "CoGo completely transformed my daily commute. The app is intuitive, drivers are professional, and I've saved so much money while making new connections!",
      location: 'San Francisco'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Software Engineer',
      avatar: '👨‍💻',
      rating: 5,
      text: "As a developer, I appreciate the seamless user experience. The real-time tracking and secure payments make this the best carpooling platform I've used.",
      location: 'Austin'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Environmental Scientist',
      avatar: '👩‍🔬',
      rating: 5,
      text: "Finally, a platform that aligns with my values! CoGo makes it easy to reduce my carbon footprint while meeting like-minded people.",
      location: 'Portland'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Graphic Designer',
      avatar: '👨‍🎨',
      rating: 5,
      text: "The design is absolutely gorgeous! But more importantly, the service is reliable and has made my daily trips so much more enjoyable.",
      location: 'Seattle'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Riders Say</span>
          </h2>
          <p className="text-xl text-gray-300 font-light">
            Join thousands of satisfied travelers who've made the switch
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-strong p-8 md:p-12 text-center neumorphic glow-cyan">
                <div className="text-6xl text-cyan-400/30 mb-6 font-serif">"</div>

                {/* Avatar */}
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl">
                      {testimonials[currentIndex].avatar}
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center space-x-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light italic">
                  {testimonials[currentIndex].text}
                </blockquote>

                {/* Name & Info */}
                <div className="space-y-2">
                  <div className="text-xl font-semibold text-white">{testimonials[currentIndex].name}</div>
                  <div className="text-cyan-400">{testimonials[currentIndex].role}</div>
                  <div className="text-gray-400 text-sm">📍 {testimonials[currentIndex].location}</div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="glass border-white/20 text-white hover:bg-white/10 hover:border-cyan-400"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="glass border-white/20 text-white hover:bg-white/10 hover:border-cyan-400"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cyan-400 glow-cyan'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Static Grid for Desktop */}
        <motion.div
          className="hidden lg:grid grid-cols-2 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ y: -5 }}
              className={`${index === currentIndex ? 'opacity-50' : 'opacity-100'} transition-opacity`}
            >
              <Card className="glass p-6 h-full hover:glow-cyan transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="flex space-x-1 mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                      {testimonial.text}
                    </p>
                    <div className="text-white font-medium text-sm">{testimonial.name}</div>
                    <div className="text-gray-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
