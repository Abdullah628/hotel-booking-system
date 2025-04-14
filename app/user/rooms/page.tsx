"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { RoomCard } from "@/components/room-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { getAvailableRooms } from "@/lib/data"
import { Hotel } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function RoomsPage() {
  const allRooms = getAvailableRooms("", "")
  const [filteredRooms, setFilteredRooms] = useState(allRooms)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [roomType, setRoomType] = useState("all")
  const [capacity, setCapacity] = useState("all")

  const handleFilter = () => {
    let results = allRooms

    // Filter by price
    results = results.filter((room) => room.price >= priceRange[0] && room.price <= priceRange[1])

    // Filter by room type
    if (roomType !== "all") {
      results = results.filter((room) => room.type.toLowerCase() === roomType.toLowerCase())
    }

    // Filter by capacity
    if (capacity !== "all") {
      const capacityNum = Number.parseInt(capacity)
      results = results.filter((room) => room.capacity >= capacityNum)
    }

    setFilteredRooms(results)
  }

  const resetFilters = () => {
    setPriceRange([0, 500])
    setRoomType("all")
    setCapacity("all")
    setFilteredRooms(allRooms)
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Browse Rooms</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Filters</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Price Range (per night)</Label>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Room Type</Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Select value={capacity} onValueChange={setCapacity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Capacity</SelectItem>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2+ People</SelectItem>
                      <SelectItem value="4">4+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Input type="date" />
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={handleFilter} className="bg-emerald-500 hover:bg-green-600">
                    Apply Filters
                  </Button>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="border-green-200 text-green-600 hover:bg-emerald-50"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            {filteredRooms.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-xl font-semibold text-green-700 mb-2">No Rooms Found</h2>
                <p className="text-gray-600 mb-4">No rooms match your current filter criteria.</p>
                <Button onClick={resetFilters} className="bg-emerald-500 hover:bg-green-600">
                  Reset Filters
                </Button>
              </div>
            )}
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
