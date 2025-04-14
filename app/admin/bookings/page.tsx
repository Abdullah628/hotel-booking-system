"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { bookings as initialBookings, rooms, users } from "@/lib/data"
import { Hotel, Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBookings = bookings.filter((booking) => {
    // Filter by status
    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const room = rooms.find((r) => r.id === booking.roomId)
      const user = users.find((u) => u.id === booking.userId)
      const searchLower = searchQuery.toLowerCase()

      return (
        booking.id.toLowerCase().includes(searchLower) ||
        (room && room.name.toLowerCase().includes(searchLower)) ||
        (user && user.name.toLowerCase().includes(searchLower)) ||
        (user && user.email.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  const handleUpdateStatus = (id: string, newStatus: "pending" | "confirmed" | "cancelled" | "completed") => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav isAdmin={true} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Manage Bookings</h1>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="mb-2">
                  Search Bookings
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="search"
                    placeholder="Search by ID, room, or guest..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-64">
                <Label htmlFor="status-filter" className="mb-2">
                  Filter by Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking List</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
                  <div className="col-span-2">Booking ID</div>
                  <div className="col-span-2">Room</div>
                  <div className="col-span-2">Guest</div>
                  <div className="col-span-2">Dates</div>
                  <div className="col-span-1">Price</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {filteredBookings.map((booking) => {
                  const room = rooms.find((r) => r.id === booking.roomId)
                  const user = users.find((u) => u.id === booking.userId)

                  return (
                    <div key={booking.id} className="grid grid-cols-12 gap-2 border-b p-4 items-center">
                      <div className="col-span-2 font-mono text-sm">{booking.id}</div>
                      <div className="col-span-2">{room?.name || "Unknown"}</div>
                      <div className="col-span-2">
                        <div>{user?.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                        <div className="text-gray-500">to {new Date(booking.checkOut).toLocaleDateString()}</div>
                      </div>
                      <div className="col-span-1">${booking.totalPrice}</div>
                      <div className="col-span-1">
                        <Badge
                          className={
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <Select
                          defaultValue={booking.status}
                          onValueChange={(value) => handleUpdateStatus(booking.id, value as any)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Set as Pending</SelectItem>
                            <SelectItem value="confirmed">Set as Confirmed</SelectItem>
                            <SelectItem value="cancelled">Set as Cancelled</SelectItem>
                            <SelectItem value="completed">Set as Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No bookings found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#00836C] text-white py-6 mt-12 border border-4-white-200">
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
