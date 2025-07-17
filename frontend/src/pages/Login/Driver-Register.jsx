"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/ui/card"

export default function DriverRegister() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [carNumber, setCarNumber] = useState("")
const [gender, setGender] = useState("")
const [phoneNumber, setPhoneNumber] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/Driver/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
  name,
  email,
  password,
  gender,
  phone: phoneNumber,     // 🔁 match backend's `phone`
  carnumber: carNumber     // 🔁 match backend's `carnumber`
})
});
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      alert("✅ Driver Registered successfully!")
      sessionStorage.setItem("driver", JSON.stringify(data.driver));
      sessionStorage.setItem("driverId", data.driver._id || data.driverId || data._id);
      // Optionally redirect:
      // window.location.href = "/Driver-login";
    } catch (error) {
      alert(`❌ ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-white">Driver Registration</CardTitle>
            <CardDescription className="text-gray-300">Register as an Driver</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
  <Label htmlFor="carNumber" className="text-white font-medium">Car Number</Label>
  <div className="relative">
    <Input
      id="carNumber"
      type="text"
      value={carNumber}
      onChange={(e) => setCarNumber(e.target.value)}
      className="pl-3 bg-white/10 border-white/20 text-white"
      placeholder="Enter your car number"
      required
    />
  </div>
</div>

<div className="space-y-2">
  <Label htmlFor="gender" className="text-white font-medium">Gender</Label>
  <div className="relative">
    <select
      id="gender"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="w-full bg-white/10 border-white/20 text-white p-2 rounded"
      required
    >
      <option value="">Select Gender</option>
      <option value="Male" className="text-black">Male</option>
      <option value="Female" className="text-black">Female</option>
      <option value="Other" className="text-black">Other</option>
    </select>
  </div>
</div>

<div className="space-y-2">
  <Label htmlFor="phoneNumber" className="text-white font-medium">Phone Number</Label>
  <div className="relative">
    <Input
      id="phoneNumber"
      type="tel"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      className="pl-3 bg-white/10 border-white/20 text-white"
      placeholder="Enter your phone number"
      pattern="[0-9]{10}"
      required
    />
  </div>
</div>


              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-gray-300">
                Already an Driver?{" "}
                <a href="/Driver-login" className="text-white font-semibold hover:underline">Sign In</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
