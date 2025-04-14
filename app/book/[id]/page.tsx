"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getRoomById } from "@/lib/data"
import { CalendarDays, CreditCard, Users, Hotel } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth"

export default function BookRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  // Redirect to login if not authenticated
  if (!user) {
    router.push(`/login?redirect=/book/${params.id}`)
  }

  const room = getRoomById(params.id)
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "")
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "")
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1)
  const [isLoading, setIsLoading] = useState(false)

  if (!room) {
    return (
      <div className="min-h-screen bg-emerald-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Room Not Found</h2>
            <p className="text-gray-600 mb-4">The room you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/rooms")} className="bg-emerald-500 hover:bg-green-600">
              Browse Rooms
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Calculate number of nights and total price
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const nights = calculateNights()
  const totalPrice = nights * room.price
  const taxesAndFees = Math.round(totalPrice * 0.12)
  const grandTotal = totalPrice + taxesAndFees

  const handleBooking = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to confirmation page
      router.push("/user/bookings?success=true")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Complete Your Booking</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Complete your reservation for {room.name}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative h-32 w-full md:w-48 rounded-md overflow-hidden">
                    <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-green-600">{room.name}</h2>
                    <p className="text-gray-600 mb-2">{room.type} Room</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        Max {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center text-xs bg-emerald-100 text-green-700 px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in" className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-green-500" />
                      Check-in Date
                    </Label>
                    <Input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="check-out" className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-green-500" />
                      Check-out Date
                    </Label>
                    <Input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Number of Guests
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min={1}
                    max={room.capacity}
                    value={guests}
                    onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                    required
                  />
                  <p className="text-sm text-gray-500">Maximum capacity: {room.capacity} guests</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Guest Information</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guest-name">Full Name</Label>
                      <Input id="guest-name" defaultValue={user?.name} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guest-email">Email</Label>
                      <Input id="guest-email" type="email" defaultValue={user?.email} required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guest-phone">Phone Number</Label>
                      <Input id="guest-phone" defaultValue={user?.phone} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                      <Input id="special-requests" placeholder="Any special requests?" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-number" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-green-500" />
                      Card Number
                    </Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium">{room.type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Price per night:</span>
                  <span className="font-medium">${room.price}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Number of nights:</span>
                  <span className="font-medium">{nights || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-gray-600">Room total:</span>
                  <span className="font-medium">${totalPrice || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & fees:</span>
                  <span className="font-medium">${taxesAndFees || 0}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">${grandTotal || 0}</span>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Cancellation policy: Free cancellation up to 24 hours before check-in.</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={handleBooking}
                  className="w-full bg-emerald-500 hover:bg-green-600"
                  disabled={!checkIn || !checkOut || isLoading}
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </Button>
              </CardFooter>
            </Card>
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
