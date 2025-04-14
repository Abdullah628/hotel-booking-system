"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getRoomById } from "@/lib/data"
import { CalendarDays, Users, Hotel, Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const room = getRoomById(params.id)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

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

  const handleBookNow = () => {
    if (!user) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/rooms/${room.id}`)
      return
    }

    // If user is logged in, proceed to booking
    router.push(`/book/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-green-700 mb-4">{room.name}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="bg-emerald-50 text-green-600 border-green-200">
                {room.type}
              </Badge>
              <Badge variant="outline" className="bg-emerald-50 text-green-600 border-green-200">
                {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
              </Badge>
            </div>

            <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-6">
              <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-green-600 mb-4">Room Description</h2>
              <p className="text-gray-600 mb-6">{room.description}</p>

              <h3 className="text-lg font-semibold text-green-600 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-600 mb-4">Room Policies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Check-in/Check-out</h3>
                  <p className="text-gray-600">Check-in: 3:00 PM - 12:00 AM</p>
                  <p className="text-gray-600">Check-out: 11:00 AM</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Cancellation Policy</h3>
                  <p className="text-gray-600">Free cancellation up to 24 hours before check-in.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">House Rules</h3>
                  <p className="text-gray-600">No smoking. No pets. No parties or events.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600 mb-4">
                  ${room.price} <span className="text-sm font-normal text-gray-600">per night</span>
                </div>

                <div className="space-y-4 mb-6">
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
                    <p className="text-xs text-gray-500">Maximum capacity: {room.capacity} guests</p>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="space-y-2 mb-6">
                    <Separator />
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">
                        ${room.price} x {nights} nights
                      </span>
                      <span className="font-medium">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Taxes & fees</span>
                      <span className="font-medium">${Math.round(totalPrice * 0.12)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between py-2 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">${totalPrice + Math.round(totalPrice * 0.12)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBookNow}
                  className="w-full bg-emerald-500 hover:bg-green-600"
                  disabled={!checkIn || !checkOut || nights <= 0}
                >
                  {user ? "Book Now" : "Login to Book"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {!user && (
                  <p className="text-center text-sm text-gray-500 mt-2">
                    You'll need to login or create an account to complete your booking.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
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
