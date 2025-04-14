import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Tv, Wind } from "lucide-react"
import type { Room } from "@/lib/data"

interface RoomCardProps {
  room: Room
  showBookButton?: boolean
}

export function RoomCard({ room, showBookButton = true }: RoomCardProps) {
  const amenityIcons: Record<string, React.ReactNode> = {
    "Free Wi-Fi": <Wifi className="h-4 w-4" />,
    "Coffee Maker": <Coffee className="h-4 w-4" />,
    "Flat-screen TV": <Tv className="h-4 w-4" />,
    "Air Conditioning": <Wind className="h-4 w-4" />,
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-green-600">{room.name}</CardTitle>
          <Badge variant="outline" className="bg-emerald-50 text-green-600 border-green-200">
            {room.type}
          </Badge>
        </div>
        <CardDescription>${room.price} per night</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-3">{room.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {room.amenities.slice(0, 4).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="flex items-center gap-1 bg-emerald-50 text-green-700">
              {amenityIcons[amenity] || null}
              <span className="text-xs">{amenity}</span>
            </Badge>
          ))}
          {room.amenities.length > 4 && (
            <Badge variant="secondary" className="bg-emerald-50 text-green-700">
              +{room.amenities.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Capacity:</span> {room.capacity} {room.capacity === 1 ? "person" : "people"}
        </div>
        {showBookButton && (
          <Link href={`/user/book/${room.id}`}>
            <Button className="bg-emerald-500 hover:bg-green-600">Book Now</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
