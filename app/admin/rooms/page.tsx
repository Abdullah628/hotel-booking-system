"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { rooms as initialRooms } from "@/lib/data"
import { Hotel, Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState(initialRooms)
  const [isEditing, setIsEditing] = useState(false)
  const [currentRoom, setCurrentRoom] = useState<any>(null)

  const handleToggleAvailability = (id: string) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, available: !room.available } : room)))
  }

  const handleEditRoom = (room: any) => {
    setCurrentRoom(room)
    setIsEditing(true)
  }

  const handleAddNewRoom = () => {
    setCurrentRoom({
      id: String(rooms.length + 1),
      name: "",
      type: "",
      price: 0,
      capacity: 1,
      description: "",
      amenities: [],
      images: ["/placeholder.svg?height=300&width=500"],
      available: true,
    })
    setIsEditing(true)
  }

  const handleSaveRoom = () => {
    if (rooms.some((room) => room.id === currentRoom.id)) {
      // Update existing room
      setRooms(rooms.map((room) => (room.id === currentRoom.id ? currentRoom : room)))
    } else {
      // Add new room
      setRooms([...rooms, currentRoom])
    }
    setIsEditing(false)
    setCurrentRoom(null)
  }

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav isAdmin={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Manage Rooms</h1>
          <Button onClick={handleAddNewRoom} className="bg-emerald-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Room
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-green-600">{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{room.type}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${room.price}/night</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">
                      {room.capacity} {room.capacity === 1 ? "person" : "people"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available:</span>
                    <Switch checked={room.available} onCheckedChange={() => handleToggleAvailability(room.id)} />
                  </div>

                  <div className="flex justify-between gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-green-200 text-green-600 hover:bg-emerald-50"
                      onClick={() => handleEditRoom(room)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentRoom?.id ? `Edit ${currentRoom.name}` : "Add New Room"}</DialogTitle>
              <DialogDescription>Make changes to the room details here. Click save when you're done.</DialogDescription>
            </DialogHeader>

            {currentRoom && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Room Name</Label>
                    <Input
                      id="name"
                      value={currentRoom.name}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Room Type</Label>
                    <Input
                      id="type"
                      value={currentRoom.type}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Night ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={currentRoom.price}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, price: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={currentRoom.capacity}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, capacity: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentRoom.description}
                    onChange={(e) => setCurrentRoom({ ...currentRoom, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Amenities (comma separated)</Label>
                  <Input
                    id="amenities"
                    value={currentRoom.amenities.join(", ")}
                    onChange={(e) =>
                      setCurrentRoom({
                        ...currentRoom,
                        amenities: e.target.value.split(",").map((item: string) => item.trim()),
                      })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={currentRoom.available}
                    onCheckedChange={(checked) => setCurrentRoom({ ...currentRoom, available: checked })}
                  />
                  <Label htmlFor="available">Available for booking</Label>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRoom} className="bg-emerald-500 hover:bg-green-600">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
