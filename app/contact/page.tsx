"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hotel, Mail, Phone, MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [inquiryType, setInquiryType] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Validate form
    if (!name || !email || !inquiryType || !message) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setInquiryType("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg?height=300&width=1200" alt="Contact Us" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            We'd love to hear from you. Reach out to us with any questions or to book your stay.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you have a question about our rooms, want to make a special request, or need assistance with a
              booking, our team is here to help.
            </p>

            {submitted ? (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Thank you for your message! Our team will get back to you shortly.
                </AlertDescription>
              </Alert>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll respond as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiry-type">
                        Inquiry Type <span className="text-red-500">*</span>
                      </Label>
                      <Select value={inquiryType} onValueChange={setInquiryType} required>
                        <SelectTrigger id="inquiry-type">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reservation">Reservation Inquiry</SelectItem>
                          <SelectItem value="general">General Information</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="group">Group Booking</SelectItem>
                          <SelectItem value="special">Special Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-500 hover:bg-green-600" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Contact Information</h2>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                    <address className="not-italic text-gray-600">
                      123 Sunset Boulevard
                      <br />
                      Paradise City, PC 12345
                      <br />
                      United States
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">Reservations: (123) 456-7890</p>
                    <p className="text-gray-600">Front Desk: (123) 456-7891</p>
                    <p className="text-gray-600">Customer Service: (123) 456-7892</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">Reservations: reservations@sunsetparadise.com</p>
                    <p className="text-gray-600">Customer Service: info@sunsetparadise.com</p>
                    <p className="text-gray-600">Events: events@sunsetparadise.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                    <p className="text-gray-600">Front Desk: 24/7</p>
                    <p className="text-gray-600">Reservations: 8:00 AM - 10:00 PM</p>
                    <p className="text-gray-600">Restaurant: 6:30 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden h-[300px] relative">
              <Image
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/f0/1d/02/bahia-resort-hotel.jpg?height=300&width=600&text=Hotel+Location+Map"
                alt="Hotel Location Map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                What are your check-in and check-out times?
              </h3>
              <p className="text-gray-600">
                Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be
                available upon request, subject to availability.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Do you offer airport transportation?</h3>
              <p className="text-gray-600">
                Yes, we offer airport shuttle service for our guests. Please contact our concierge at least 24 hours in
                advance to arrange transportation.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Is breakfast included with the room?</h3>
              <p className="text-gray-600">
                Breakfast is included with select room packages. Please check your reservation details or contact our
                front desk to confirm if breakfast is included with your stay.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Do you have parking facilities?</h3>
              <p className="text-gray-600">
                Yes, we offer both self-parking and valet parking options. Valet parking is available for $25 per day,
                while self-parking is available for $15 per day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="h-6 w-6" />
                <span className="text-xl font-bold">Sunset Paradise</span>
              </div>
              <p className="text-green-100">
                Luxury accommodations for business and leisure travelers in the heart of the city.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/rooms" className="text-green-100 hover:text-white">
                    Rooms
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-green-100 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-green-100 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-green-100 hover:text-white">
                    Login
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-green-100">
                <p>123 Sunset Boulevard</p>
                <p>Paradise City, PC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@sunsetparadise.com</p>
              </address>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-green-100  mb-2">Subscribe to get special offers and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-r-md">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="border-t border-green-500 mt-8 pt-6 text-center text-green-100">
            &copy; {new Date().getFullYear()} Sunset Paradise Hotel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
