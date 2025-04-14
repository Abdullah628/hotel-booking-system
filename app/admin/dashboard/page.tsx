import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBookings, rooms, users } from "@/lib/data"
import { Hotel, Users, CreditCard, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const bookings = getAllBookings()
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)
  const occupancyRate = Math.round((confirmedBookings / rooms.length) * 100)

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav isAdmin={true} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">
                {confirmedBookings} confirmed, {pendingBookings} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">+2 new users this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const room = rooms.find((r) => r.id === booking.roomId)
                  const user = users.find((u) => u.id === booking.userId)

                  return (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{room?.name || "Unknown Room"}</p>
                        <p className="text-sm text-gray-600">{user?.name || "Unknown User"}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${booking.totalPrice}</p>
                        <p
                          className={`text-xs ${
                            booking.status === "confirmed"
                              ? "text-green-600"
                              : booking.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {booking.status.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 text-center">
                <Link href="/admin/bookings" className="text-sm text-green-600 hover:underline">
                  View all bookings
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Room Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{room.name}</p>
                      <p className="text-sm text-gray-600">
                        {room.type} - ${room.price}/night
                      </p>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          room.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.available ? "Available" : "Booked"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link href="/admin/rooms" className="text-sm text-green-600 hover:underline">
                  Manage rooms
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-green-600 text-white py-6 mt-12">
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
