"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"
import React, { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const featuredPost = {
    id: 1,
    title: "The Future of Urban Mobility: How Carpooling is Reshaping Indian Cities",
    excerpt:
      "Discover how shared transportation is revolutionizing the way we commute in India's bustling metropolitan areas, reducing traffic congestion and environmental impact.",
    content:
      "As India's urban population continues to grow at an unprecedented rate, our cities are facing mounting challenges with traffic congestion, air pollution, and transportation costs. Carpooling is emerging as a sustainable solution, offering not just cost savings but also a way to build community and reduce our carbon footprint. In this article, we explore the latest trends, government initiatives, and real-life stories of commuters who have embraced ride-sharing as a way of life...",
    author: {
      name: "Dr. Arjun Mehta",
      role: "Urban Planning Expert",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    publishedAt: "2024-12-15",
    readTime: "8 min read",
    category: "Urban Planning",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    tags: ["Sustainability", "Urban Mobility", "Future Tech"],
  }

  // Add more blog posts for each category
  const blogPosts = [
    // Urban Planning
    {
      id: 2,
      title: "Smart Cities: Integrating Carpooling into Urban Infrastructure",
      excerpt: "How Indian cities are leveraging technology to make carpooling a seamless part of daily commutes.",
      author: {
        name: "Ritika Singh",
        role: "Smart City Analyst",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      publishedAt: "2024-12-12",
      readTime: "6 min read",
      category: "Urban Planning",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      tags: ["Smart Cities", "Urban Planning", "Mobility"],
    },
    // Finance
    {
      id: 3,
      title: "5 Ways Carpooling Can Save You Money This Year",
      excerpt:
        "Learn practical strategies to reduce your commuting costs while contributing to a greener environment through smart ride-sharing decisions.",
      author: {
        name: "Priya Sharma",
        role: "Financial Advisor",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      publishedAt: "2024-12-10",
      readTime: "5 min read",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      tags: ["Money Saving", "Tips", "Budgeting"],
    },
    {
      id: 4,
      title: "Carpooling vs. Owning a Car: The Real Cost Breakdown",
      excerpt: "A detailed look at how much you can save by sharing rides instead of owning a vehicle in India.",
      author: {
        name: "Anil Kapoor",
        role: "Transport Economist",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      publishedAt: "2024-12-09",
      readTime: "7 min read",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      tags: ["Finance", "Car Ownership", "Comparison"],
    },
    // Safety
    {
      id: 5,
      title: "Building Trust in the Sharing Economy: Safety First",
      excerpt:
        "Explore the comprehensive safety measures and verification processes that make modern carpooling platforms secure for all users.",
      author: {
        name: "Rajesh Kumar",
        role: "Safety & Security Expert",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      },
      publishedAt: "2024-12-05",
      readTime: "6 min read",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      tags: ["Safety", "Trust", "Verification"],
    },
    {
      id: 6,
      title: "Women’s Safety in Carpooling: What You Need to Know",
      excerpt: "Tips and features that make carpooling safer for women in Indian cities.",
      author: {
        name: "Meera Joshi",
        role: "Women’s Rights Advocate",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      publishedAt: "2024-12-03",
      readTime: "5 min read",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
      tags: ["Safety", "Women", "Tips"],
    },
    // Environment
    {
      id: 7,
      title: "The Environmental Impact of Shared Transportation",
      excerpt:
        "Understand how choosing carpooling over individual vehicle ownership can significantly reduce your carbon footprint and help combat climate change.",
      author: {
        name: "Dr. Sneha Patel",
        role: "Environmental Scientist",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      publishedAt: "2024-11-28",
      readTime: "7 min read",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
      tags: ["Environment", "Sustainability", "Climate Change"],
    },
    {
      id: 8,
      title: "Green Commuting: How Carpooling Reduces Air Pollution",
      excerpt: "A look at the positive effects of carpooling on air quality in major Indian cities.",
      author: {
        name: "Vikram Desai",
        role: "Environmental Journalist",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
      publishedAt: "2024-11-25",
      readTime: "6 min read",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      tags: ["Green", "Commuting", "Air Pollution"],
    },
    // How-To
    {
      id: 9,
      title: "How to Start a Carpool: A Step-by-Step Guide for Beginners",
      excerpt:
        "Starting a carpool is easier than you think! Follow our simple guide to set up your first ride and invite friends or colleagues.",
      author: {
        name: "Amit Verma",
        role: "Mobility Blogger",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      publishedAt: "2024-11-20",
      readTime: "4 min read",
      category: "How-To",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      tags: ["Guide", "Carpool", "Beginner"],
    },
    {
      id: 10,
      title: "Carpooling Etiquette: Do’s and Don’ts for a Smooth Ride",
      excerpt: "Master the art of carpooling with these essential etiquette tips for drivers and passengers.",
      author: {
        name: "Sunita Rao",
        role: "Community Manager",
        avatar: "https://randomuser.me/api/portraits/women/53.jpg",
      },
      publishedAt: "2024-11-18",
      readTime: "5 min read",
      category: "How-To",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      tags: ["Etiquette", "Tips", "Carpool"],
    },
  ];

  const categories = [
    { name: "All Posts", count: blogPosts.length, active: selectedCategory === "All Posts" },
    { name: "Urban Planning", count: blogPosts.filter(b => b.category === "Urban Planning").length, active: selectedCategory === "Urban Planning" },
    { name: "Finance", count: blogPosts.filter(b => b.category === "Finance").length, active: selectedCategory === "Finance" },
    { name: "Safety", count: blogPosts.filter(b => b.category === "Safety").length, active: selectedCategory === "Safety" },
    { name: "Environment", count: blogPosts.filter(b => b.category === "Environment").length, active: selectedCategory === "Environment" },
    { name: "How-To", count: blogPosts.filter(b => b.category === "How-To").length, active: selectedCategory === "How-To" },
  ];

  // Filtered blogs
  const filteredBlogs = selectedCategory === "All Posts"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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
              RideSphere{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Insights, tips, and stories about the future of shared transportation and sustainable mobility
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post (show only for All Posts or Urban Planning) */}
      {(selectedCategory === "All Posts" || selectedCategory === "Urban Planning") && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl overflow-hidden hover:bg-white/50 transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <motion.div
                    className="relative h-64 lg:h-auto overflow-hidden"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">Featured</Badge>
                    </div>
                  </motion.div>

                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 w-fit mb-4 animate-fadeInUp">
                      {featuredPost.category}
                    </Badge>

                    <motion.h2
                      className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      {featuredPost.title}
                    </motion.h2>

                    <motion.p
                      className="text-slate-600 mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    >{featuredPost.excerpt}</motion.p>

                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={featuredPost.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                          {featuredPost.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-800">{featuredPost.author.name}</div>
                        <div className="text-sm text-slate-600">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1, backgroundColor: '#e0e7ff' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="inline-block"
                        >
                          <Badge variant="outline" className="bg-white/50 border-slate-200 cursor-pointer">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl w-fit shadow-lg">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories & Posts */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 sticky top-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.04, backgroundColor: '#dbeafe', color: '#1e40af' }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-full text-left p-3 rounded-xl transition-colors duration-200 flex items-center justify-between font-medium ${
                          category.active
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "hover:bg-white/50 text-slate-700"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        <span>{category.name}</span>
                        <Badge variant={category.active ? "secondary" : "outline"} className="text-xs">
                          {category.count}
                        </Badge>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-4">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Sustainability", "Money Saving", "Safety", "Urban Planning", "Environment", "Guide", "Carpool"].map(
                        (tag, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1, backgroundColor: '#e0e7ff' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="inline-block"
                          >
                            <Badge
                              variant="outline"
                              className="bg-white/50 border-slate-200 hover:bg-blue-50 cursor-pointer text-xs"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                key={selectedCategory}
              >
                {filteredBlogs.map((post, index) => (
                  <motion.div key={post.id} variants={fadeInUp} whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(30, 64, 175, 0.12)' }}>
                    <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group shadow-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <motion.div className="relative w-full aspect-video overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
                          <motion.img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.08 }}
                          />
                        </motion.div>

                        <CardContent className="md:col-span-2 p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">{post.category}</Badge>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </div>

                          <motion.h3
                            className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                          >
                            {post.title}
                          </motion.h3>

                          <motion.p
                            className="text-slate-600 mb-4 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            {post.excerpt}
                          </motion.p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                                  {post.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium text-slate-800">{post.author.name}</div>
                                <div className="text-xs text-slate-600">{post.author.role}</div>
                              </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.08 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                              >
                                Read More
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </motion.div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag, tagIndex) => (
                              <motion.div
                                key={tagIndex}
                                whileHover={{ scale: 1.1, backgroundColor: '#e0e7ff' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="inline-block"
                              >
                                <Badge variant="outline" className="bg-white/50 border-slate-200 text-xs cursor-pointer">
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
              <div className="text-center mt-12">
                <motion.div whileHover={{ scale: 1.07 }}>
                  <Button
                    variant="outline"
                    className="px-8 py-3 rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent shadow-md"
                  >
                    Load More Articles
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
