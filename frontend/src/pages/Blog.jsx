"use client"

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
  const [selectedTag, setSelectedTag] = useState(null);

  const featuredPost = {
    id: 1,
    title: "How Carpooling Apps Are Transforming Indian Commutes",
    excerpt:
      "Explore how digital platforms are making shared rides safer, more convenient, and more affordable for millions of daily commuters.",
    content:
      "With the rise of carpooling apps, Indian cities are witnessing a shift in how people travel. This article delves into the technology, safety features, and community impact of these platforms, featuring interviews with both drivers and riders.",
    author: {
      name: "Neha Bansal",
      role: "Mobility Tech Journalist",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    publishedAt: "2024-12-20",
    readTime: "7 min read",
    category: "Urban Planning",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", // commute, city, carpool
    tags: ["Carpooling", "Technology", "Urban Mobility"],
  };

  const blogPosts = [
    {
      id: 2,
      title: "Why Shared Rides Are the Future of Sustainable Cities",
      excerpt: "Shared mobility is key to reducing congestion and pollution. Learn how carpooling is helping cities breathe easier.",
      author: {
        name: "Amit Sinha",
        role: "Urban Policy Analyst",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      },
      publishedAt: "2024-12-18",
      readTime: "6 min read",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80", // city, shared rides
      tags: ["Sustainability", "Urban Planning", "Environment"],
    },
    {
      id: 3,
      title: "How to Stay Safe When Carpooling with Strangers",
      excerpt: "Safety is a top concern for carpoolers. Here are expert tips and app features that keep your ride secure.",
      author: {
        name: "Priya Deshmukh",
        role: "Safety Consultant",
        avatar: "https://randomuser.me/api/portraits/women/47.jpg",
      },
      publishedAt: "2024-12-15",
      readTime: "5 min read",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80", // seatbelt, safety
      tags: ["Safety", "Tips", "Trust"],
    },
    {
      id: 4,
      title: "The Real Cost Savings of Carpooling: A Monthly Breakdown",
      excerpt: "See how much you can save each month by sharing rides instead of driving solo, with real user stories and numbers.",
      author: {
        name: "Rohit Agarwal",
        role: "Financial Blogger",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      },
      publishedAt: "2024-12-10",
      readTime: "4 min read",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80", // hands holding coins, savings
      tags: ["Money Saving", "Finance", "Budgeting"],
    },
    {
      id: 5,
      title: "Women’s Experiences: Carpooling in Indian Cities",
      excerpt: "Hear from women who use carpooling apps about safety, convenience, and the features that matter most to them.",
      author: {
        name: "Shreya Iyer",
        role: "Community Writer",
        avatar: "https://randomuser.me/api/portraits/women/60.jpg",
      },
      publishedAt: "2024-12-08",
      readTime: "6 min read",
      category: "Safety",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", // women, city commute
      tags: ["Women", "Safety", "Community"],
    },
    {
      id: 6,
      title: "How to Start a Carpool: Step-by-Step for Beginners",
      excerpt: "New to carpooling? This guide walks you through finding, joining, or starting your first shared ride.",
      author: {
        name: "Deepak Verma",
        role: "Mobility Blogger",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      },
      publishedAt: "2024-12-05",
      readTime: "5 min read",
      category: "How-To",
      image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80", // group of friends in a car
      tags: ["Guide", "Carpool", "Beginner"],
    },
    {
      id: 7,
      title: "Green Commuting: How Carpooling Reduces Air Pollution",
      excerpt: "A look at the positive effects of carpooling on air quality in major Indian cities, with data and expert opinions.",
      author: {
        name: "Vikram Desai",
        role: "Environmental Journalist",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
      publishedAt: "2024-12-01",
      readTime: "6 min read",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80", // green city road
      tags: ["Green", "Commuting", "Air Pollution"],
    },
    {
      id: 8,
      title: "Carpooling Etiquette: Do’s and Don’ts for a Smooth Ride",
      excerpt: "Master the art of carpooling with these essential etiquette tips for drivers and passengers.",
      author: {
        name: "Sunita Rao",
        role: "Community Manager",
        avatar: "https://randomuser.me/api/portraits/women/53.jpg",
      },
      publishedAt: "2024-11-28",
      readTime: "5 min read",
      category: "How-To",
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80", // etiquette, car interior, people
      tags: ["Etiquette", "Tips", "Carpool"],
    },
    {
      id: 9,
      title: "How Carpooling Helps Fight Climate Change",
      excerpt: "Carpooling is more than just saving money—it's a powerful tool for reducing your carbon footprint.",
      author: {
        name: "Dr. Sneha Patel",
        role: "Environmental Scientist",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      publishedAt: "2024-11-25",
      readTime: "7 min read",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", // climate change, earth
      tags: ["Environment", "Sustainability", "Climate Change"],
    },
    {
      id: 10,
      title: "The Social Side of Carpooling: Making Friends on the Road",
      excerpt: "Discover how carpooling is helping people build new friendships and networks during their daily commutes.",
      author: {
        name: "Anjali Menon",
        role: "Social Researcher",
        avatar: "https://randomuser.me/api/portraits/women/50.jpg",
      },
      publishedAt: "2024-11-20",
      readTime: "6 min read",
      category: "Community",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80", // friends, road trip
      tags: ["Community", "Social", "Carpool"],
    },
    {
      id: 11,
      title: "Designing Cities for People, Not Just Cars",
      excerpt: "Explore how modern urban planning is shifting focus from vehicles to people, making cities more walkable, livable, and sustainable.",
      author: {
        name: "Ritika Singh",
        role: "Urban Planner",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      publishedAt: "2024-12-22",
      readTime: "6 min read",
      category: "Urban Planning",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80", // modern city street
      tags: ["Urban Planning", "Sustainability", "City Design"],
    },
  ];

  const categories = [
    { name: "All Posts", count: blogPosts.length, active: selectedCategory === "All Posts" },
    { name: "Urban Planning", count: blogPosts.filter(b => b.category === "Urban Planning").length, active: selectedCategory === "Urban Planning" },
    { name: "Finance", count: blogPosts.filter(b => b.category === "Finance").length, active: selectedCategory === "Finance" },
    { name: "Safety", count: blogPosts.filter(b => b.category === "Safety").length, active: selectedCategory === "Safety" },
    { name: "Environment", count: blogPosts.filter(b => b.category === "Environment").length, active: selectedCategory === "Environment" },
    { name: "How-To", count: blogPosts.filter(b => b.category === "How-To").length, active: selectedCategory === "How-To" },
    { name: "Community", count: blogPosts.filter(b => b.category === "Community").length, active: selectedCategory === "Community" },
  ];

  // Filtered blogs
  const filteredBlogs = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : selectedCategory === "All Posts"
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10" />
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Carpooling Blog Hero" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="text-center max-w-4xl mx-auto"
          >
            <h1
              className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight drop-shadow-lg"
            >
              CoGo <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed"
            >
              Insights, tips, and stories about the future of carpooling, shared rides, and sustainable mobility in India.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post (show only for All Posts or Urban Planning) */}
      {(selectedCategory === "All Posts" || selectedCategory === "Urban Planning") && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-3xl overflow-hidden hover:bg-white/50 transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div
                    className="relative h-64 lg:h-auto overflow-hidden"
                  >
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 rounded-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">Featured</Badge>
                    </div>
                  </div>

                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 w-fit mb-4 animate-fadeInUp">
                      {featuredPost.category}
                    </Badge>

                    <h2
                      className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 leading-tight"
                    >
                      {featuredPost.title}
                    </h2>

                    <p
                      className="text-slate-600 mb-6 leading-relaxed"
                    >{featuredPost.excerpt}</p>

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
                        <div
                          key={index}
                          whileHover={{ scale: 1.1, backgroundColor: '#e0e7ff' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="inline-block"
                        >
                          <Badge variant="outline" className="bg-white/50 border-slate-200 cursor-pointer">
                            {tag}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div whileHover={{ scale: 1.05 }}>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl w-fit shadow-lg">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Categories & Posts */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl p-6 sticky top-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        whileHover={{ scale: 1.04, backgroundColor: '#dbeafe', color: '#1e40af' }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-full text-left p-3 rounded-xl transition-colors duration-200 flex items-center justify-between font-medium ${
                          category.active
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "hover:bg-white/50 text-slate-700"
                        }`}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedTag(null);
                        }}
                      >
                        <span>{category.name}</span>
                        <Badge variant={category.active ? "secondary" : "outline"} className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-4">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Sustainability", "Money Saving", "Safety", "Urban Planning", "Environment", "Guide", "Carpool", "Beginner", "Women", "Community", "Social", "Climate Change"].map(
                        (tag, index) => (
                          <button
                            key={index}
                            className={`inline-block px-3 py-1 rounded-xl border border-slate-200 text-xs cursor-pointer transition-colors duration-200 ${selectedTag === tag ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" : "bg-white/50 hover:bg-blue-50 text-slate-700"}`}
                            onClick={() => {
                              setSelectedTag(tag);
                              setSelectedCategory(null);
                            }}
                          >
                            {tag}
                          </button>
                        ),
                      )}
                      {selectedTag && (
                        <button
                          className="inline-block px-3 py-1 rounded-xl border border-slate-200 text-xs cursor-pointer bg-red-100 text-red-700 ml-2"
                          onClick={() => {
                            setSelectedTag(null);
                            setSelectedCategory("All Posts");
                          }}
                        >
                          Clear Tag Filter
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div
                className="space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                key={selectedCategory}
              >
                {filteredBlogs.map((post, index) => (
                  <div key={post.id} variants={fadeInUp} whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(30, 64, 175, 0.12)' }}>
                    <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group shadow-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <div className="relative w-full aspect-video overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 rounded-lg"
                          />
                        </div>

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

                          <h3
                            className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200"
                          >
                            {post.title}
                          </h3>

                          <p
                            className="text-slate-600 mb-4 leading-relaxed"
                          >
                            {post.excerpt}
                          </p>

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

                            <div whileHover={{ scale: 1.08 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                              >
                                Read More
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag, tagIndex) => (
                              <div
                                key={tagIndex}
                                whileHover={{ scale: 1.1, backgroundColor: '#e0e7ff' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="inline-block"
                              >
                                <Badge variant="outline" className="bg-white/50 border-slate-200 text-xs cursor-pointer">
                                  {tag}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <div whileHover={{ scale: 1.07 }}>
                  <Button
                    variant="outline"
                    className="px-8 py-3 rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent shadow-md"
                  >
                    Load More Articles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
