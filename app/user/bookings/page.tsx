"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getUserBookings, getRoomById } from "@/lib/data"
import { Hotel, Calendar, MapPin, CreditCard, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function UserBookingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get("success") === "true"
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming")
  const [userBookings, setUserBookings] = useState<any[]>([])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/user/bookings")
    } else {
      // For demo purposes, we'll use a fixed user ID
      setUserBookings(getUserBookings(user.id))
    }
  }, [user, router])

  if (!user) {
    return null // Or a loading state
  }

  const filteredBookings = userBookings.filter((booking) => {
    const checkOutDate = new Date(booking.checkOut)
    const today = new Date()

    if (activeTab === "upcoming") {
      return checkOutDate >= today
    } else if (activeTab === "past") {
      return checkOutDate < today
    }

    return true
  })

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">My Bookings</h1>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Your booking has been confirmed successfully! You will receive a confirmation email shortly.
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex border-b">
            <button
              className={cn(
                "px-4 py-2 font-medium text-sm",
                activeTab === "upcoming"
                  ? "text-green-600 border-b-2 border-green-500"
                  : "text-gray-600 hover:text-green-600",
              )}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={cn(
                "px-4 py-2 font-medium text-sm",
                activeTab === "past"
                  ? "text-green-600 border-b-2 border-green-500"
                  : "text-gray-600 hover:text-green-600",
              )}
              onClick={() => setActiveTab("past")}
            >
              Past
            </button>
            <button
              className={cn(
                "px-4 py-2 font-medium text-sm",
                activeTab === "all"
                  ? "text-green-600 border-b-2 border-green-500"
                  : "text-gray-600 hover:text-green-600",
              )}
              onClick={() => setActiveTab("all")}
            >
              All Bookings
            </button>
          </div>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const room = getRoomById(booking.roomId)

              return (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-emerald-100 p-6 md:w-64 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-green-700">Booking #{booking.id}</h3>
                          <p className="text-sm text-green-600">{new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>

                        <Badge
                          className={cn(
                            "w-fit mt-4",
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100",
                          )}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{room?.name || "Deluxe Room"}</h3>
                            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                              <MapPin className="h-4 w-4 text-green-500" />
                              <span>Sunset Paradise, City Center</span>
                            </div>

                            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                              <Calendar className="h-4 w-4 text-green-500" />
                              <span>
                                {new Date(booking.checkIn).toLocaleDateString()} to{" "}
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                              <CreditCard className="h-4 w-4 text-green-500" />
                              <span>Total: ${booking.totalPrice}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              className="border-green-200 text-green-600 hover:bg-emerald-50"
                              onClick={() => router.push(`/rooms/${booking.id}`)}
                            >
                              View Details
                            </Button>

                            {new Date(booking.checkIn) > new Date() && booking.status !== "cancelled" && (
                              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                Cancel Booking
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">No Bookings Found</h2>
            <p className="text-gray-600 mb-4">
              {activeTab === "upcoming"
                ? "You don't have any upcoming bookings."
                : activeTab === "past"
                  ? "You don't have any past bookings."
                  : "You don't have any bookings yet."}
            </p>
            <Link href="/rooms">
              <Button className="bg-emerald-500 hover:bg-green-600">Browse Rooms</Button>
            </Link>
          </div>
        )}
      </main>

      <footer className="bg-[#00836C] text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Hotel className="h-5 w-5" />
              <span className="text-lg font-bold">Sunset Paradise</span>
            </div>
            <div className="text-sm">&copy; {new Date().getFullYear()} Sunset Paradise. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
