"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"

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
  const featuredPost = {
    id: 1,
    title: "The Future of Urban Mobility: How Carpooling is Reshaping Indian Cities",
    excerpt:
      "Discover how shared transportation is revolutionizing the way we commute in India's bustling metropolitan areas, reducing traffic congestion and environmental impact.",
    content:
      "As India's urban population continues to grow at an unprecedented rate, our cities are facing mounting challenges with traffic congestion, air pollution, and transportation costs...",
    author: {
      name: "Dr. Arjun Mehta",
      role: "Urban Planning Expert",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    publishedAt: "2024-12-15",
    readTime: "8 min read",
    category: "Urban Planning",
    image: "/placeholder.svg?height=400&width=800",
    tags: ["Sustainability", "Urban Mobility", "Future Tech"],
  }

  const blogPosts = [
    {
      id: 2,
      title: "5 Ways Carpooling Can Save You Money This Year",
      excerpt:
        "Learn practical strategies to reduce your commuting costs while contributing to a greener environment through smart ride-sharing decisions.",
      author: {
        name: "Priya Sharma",
        role: "Financial Advisor",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      publishedAt: "2024-12-10",
      readTime: "5 min read",
      category: "Finance",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Money Saving", "Tips", "Budgeting"],
    },
    {
      id: 3,
      title: "Building Trust in the Sharing Economy: Safety First",
      excerpt:
        "Explore the comprehensive safety measures and verification processes that make modern carpooling platforms secure for all users.",
      author: {
        name: "Rajesh Kumar",
        role: "Safety & Security Expert",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      publishedAt: "2024-12-05",
      readTime: "6 min read",
      category: "Safety",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Safety", "Trust", "Verification"],
    },
    {
      id: 4,
      title: "The Environmental Impact of Shared Transportation",
      excerpt:
        "Understand how choosing carpooling over individual vehicle ownership can significantly reduce your carbon footprint and help combat climate change.",
      author: {
        name: "Dr. Sneha Patel",
        role: "Environmental Scientist",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      publishedAt: "2024-11-28",
      readTime: "7 min read",
      category: "Environment",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Environment", "Sustainability", "Climate Change"],
    },
  ]

  const categories = [
    { name: "All Posts", count: 12, active: true },
    { name: "Urban Planning", count: 4, active: false },
    { name: "Finance", count: 3, active: false },
    { name: "Safety", count: 2, active: false },
    { name: "Environment", count: 3, active: false },
  ]

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

      {/* Featured Post */}
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
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">Featured</Badge>
                  </div>
                </div>

                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 w-fit mb-4">
                    {featuredPost.category}
                  </Badge>

                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>

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
                      <Badge key={index} variant="outline" className="bg-white/50 border-slate-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl w-fit">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

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
                      <button
                        key={index}
                        className={`w-full text-left p-3 rounded-xl transition-colors duration-200 flex items-center justify-between ${
                          category.active
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : "hover:bg-white/50 text-slate-700"
                        }`}
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
                      {["Sustainability", "Money Saving", "Safety", "Urban Planning", "Environment"].map(
                        (tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-white/50 border-slate-200 hover:bg-blue-50 cursor-pointer"
                          >
                            {tag}
                          </Badge>
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
                whileInView="animate"
                viewport={{ once: true }}
              >
                {blogPosts.map((post, index) => (
                  <motion.div key={post.id} variants={fadeInUp}>
                    <Card className="backdrop-blur-xl bg-white/40 border-white/50 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300 group">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <div className="relative h-48 md:h-auto">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
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

                          <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                            {post.title}
                          </h3>

                          <p className="text-slate-600 mb-4 leading-relaxed">{post.excerpt}</p>

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

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                            >
                              Read More
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="bg-white/50 border-slate-200 text-xs">
                                {tag}
                              </Badge>
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
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent"
                >
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-3xl mx-auto" {...fadeInUp}>
            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-white/30 rounded-3xl p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Stay Updated</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Subscribe to our newsletter and get the latest insights on sustainable transportation, money-saving
                  tips, and mobility trends delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl border border-white/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
