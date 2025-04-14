import { MainNav } from "@/components/main-nav"
import { RoomCard } from "@/components/room-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAvailableRooms, getUserBookings } from "@/lib/data"
import { CalendarDays, Users, CreditCard, Clock, Hotel } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function UserDashboard() {
  // For demo purposes, we'll use a fixed user ID
  const userId = "1"
  const userBookings = getUserBookings(userId)
  const featuredRooms = getAvailableRooms("", "").slice(0, 3)

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Welcome, Guest</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-green-500" />
                Quick Booking
              </CardTitle>
              <CardDescription>Find and book a room</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/user/rooms">
                <Button className="w-full bg-emerald-500 hover:bg-green-600">Browse Rooms</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Active Bookings
              </CardTitle>
              <CardDescription>Your upcoming stays</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/user/bookings">
                <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-emerald-50">
                  View Bookings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your cards</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/user/payment">
                <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-emerald-50">
                  Manage Payments
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                Check-in/out
              </CardTitle>
              <CardDescription>Express service</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/user/checkin">
                <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-emerald-50">
                  Express Check-in
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {userBookings.length > 0 ? (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Upcoming Bookings</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              {userBookings.map((booking) => (
                <div key={booking.id} className="border-b last:border-0 py-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h3 className="font-medium text-lg">Room: Deluxe Ocean View</h3>
                      <p className="text-gray-600">
                        {new Date(booking.checkIn).toLocaleDateString()} to{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          "px-3 py-1",
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800",
                        )}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <Link href={`/user/book/${booking.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mb-10">
            <h2 className="text-xl font-semibold text-green-700 mb-2">No Upcoming Bookings</h2>
            <p className="text-gray-600 mb-4">You don't have any active bookings at the moment.</p>
            <Link href="/user/rooms">
              <Button className="bg-emerald-500 hover:bg-green-600">Book a Room</Button>
            </Link>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-green-700">Featured Rooms</h2>
            <Link href="/user/rooms">
              <Button variant="link" className="text-green-600">
                View All Rooms
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
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
