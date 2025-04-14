export interface Room {
  id: string
  name: string
  type: string
  price: number
  capacity: number
  description: string
  amenities: string[]
  images: string[]
  available: boolean
}

export interface Booking {
  id: string
  roomId: string
  userId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  isAdmin: boolean
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Royal Ocean Suite",
    type: "Luxury Suite",
    price: 350,
    capacity: 2,
    description:
      "Experience unparalleled luxury in our Royal Ocean Suite, featuring breathtaking ocean views, a king-size canopy bed, and a private balcony perfect for watching the sunset. This spacious suite includes a separate living area and a marble bathroom with a deep soaking tub.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "55-inch Smart TV",
      "Mini Bar",
      "Nespresso Machine",
      "Rainfall Shower",
      "Luxury Toiletries",
      "Room Service",
      "Balcony",
    ],
    images: ["https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "2",
    name: "Paradise Family Villa",
    type: "Family Suite",
    price: 450,
    capacity: 5,
    description:
      "Perfect for families, our spacious Paradise Family Villa offers two bedrooms, a fully equipped kitchen, and a comfortable living area. Enjoy quality time together with board games and movies, or relax on your private terrace overlooking the garden.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Two Smart TVs",
      "Full Kitchen",
      "Dining Area",
      "Washer/Dryer",
      "Children's Amenities",
      "Private Terrace",
      "Garden View",
    ],
    images: ["https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "3",
    name: "Sunset Deluxe Room",
    type: "Deluxe",
    price: 180,
    capacity: 2,
    description:
      "Our Sunset Deluxe Rooms offer the perfect blend of comfort and style. Featuring plush queen-size beds, elegant décor, and all the essential amenities, these rooms provide a peaceful retreat after a day of exploration or business.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "42-inch TV",
      "Coffee Maker",
      "Mini Fridge",
      "Work Desk",
      "Blackout Curtains",
    ],
    images: ["https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "4",
    name: "Tropical Garden Bungalow",
    type: "Bungalow",
    price: 320,
    capacity: 3,
    description:
      "Nestled in our lush tropical gardens, these charming bungalows offer privacy and tranquility. Each features a king-size bed, a cozy sitting area, and a private patio where you can enjoy your morning coffee surrounded by nature.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Mini Bar",
      "Coffee Maker",
      "Private Patio",
      "Garden Access",
      "Outdoor Shower",
    ],
    images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/290948194.jpg?k=2cd6d3260ab3bfcc0d88a87f055f9db09baf1c495f270707b82abce74129596a&o=&hp=1?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "5",
    name: "Presidential Penthouse",
    type: "Penthouse",
    price: 650,
    capacity: 4,
    description:
      "Our crown jewel, the Presidential Penthouse, offers unmatched luxury and panoramic views from the top floor. This expansive suite features two bedrooms, a grand living room, dining area, and a private rooftop terrace with a hot tub.",
    amenities: [
      "Free Wi-Fi",
      "Climate Control",
      "65-inch OLED TV",
      "Premium Bar",
      "Espresso Machine",
      "Jacuzzi",
      "Private Terrace",
      "Butler Service",
      "Private Chef Option",
      "VIP Airport Transfer",
    ],
    images: ["https://images.unsplash.com/photo-1561501900-3701fa6a0864?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "6",
    name: "Cozy Standard Room",
    type: "Standard",
    price: 120,
    capacity: 1,
    description:
      "Our Cozy Standard Rooms are perfect for solo travelers or business guests. Efficiently designed with all the essentials, these comfortable rooms feature a single bed, work desk, and modern bathroom, providing excellent value without compromising on quality.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "32-inch TV", "Coffee Maker", "Work Desk", "Shower"],
    images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fHww?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "7",
    name: "Honeymoon Retreat",
    type: "Suite",
    price: 400,
    capacity: 2,
    description:
      "Designed specifically for couples, our Honeymoon Retreat creates the perfect romantic atmosphere. Featuring a four-poster king bed, champagne service, a double rainfall shower, and a private balcony with stunning views, it's the ideal setting for a special getaway.",
    amenities: [
      "Free Wi-Fi",
      "Climate Control",
      "50-inch TV",
      "Premium Mini Bar",
      "Espresso Machine",
      "Double Rainfall Shower",
      "Luxury Toiletries",
      "Champagne Service",
      "Rose Petal Turndown",
    ],
    images: ["https://static.meghpolli.com/meghpolli/static/assets/img/Meghpolli-Resort-Photos-Gallery/full/42.jpg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
  {
    id: "8",
    name: "Executive Business Suite",
    type: "Business",
    price: 280,
    capacity: 2,
    description:
      "Our Executive Business Suites cater to the needs of corporate travelers. Each suite features a king-size bed, a separate work area with an ergonomic chair, high-speed internet, and a meeting table that can accommodate up to four people.",
    amenities: [
      "Free High-Speed Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Coffee Machine",
      "Mini Bar",
      "Ergonomic Workspace",
      "Meeting Table",
      "Printer Access",
      "Shoe Shine Service",
    ],
    images: ["https://westin.marriott.com/wp-content/uploads/2023/09/wesPHXWTpo.1254555_1536x1536-768x768.jpg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    available: true,
  },
]

export const bookings: Booking[] = [
  {
    id: "1",
    roomId: "1",
    userId: "1",
    checkIn: "2023-06-15",
    checkOut: "2023-06-20",
    guests: 2,
    totalPrice: 1750,
    status: "confirmed",
    createdAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "2",
    roomId: "3",
    userId: "2",
    checkIn: "2023-07-01",
    checkOut: "2023-07-05",
    guests: 2,
    totalPrice: 720,
    status: "pending",
    createdAt: "2023-06-20T09:15:00Z",
  },
  {
    id: "3",
    roomId: "5",
    userId: "3",
    checkIn: "2023-08-10",
    checkOut: "2023-08-15",
    guests: 2,
    totalPrice: 3250,
    status: "confirmed",
    createdAt: "2023-07-05T16:45:00Z",
  },
  {
    id: "4",
    roomId: "2",
    userId: "1",
    checkIn: "2023-09-05",
    checkOut: "2023-09-10",
    guests: 4,
    totalPrice: 2250,
    status: "completed",
    createdAt: "2023-08-01T11:20:00Z",
  },
  {
    id: "5",
    roomId: "4",
    userId: "2",
    checkIn: "2023-10-15",
    checkOut: "2023-10-18",
    guests: 3,
    totalPrice: 960,
    status: "cancelled",
    createdAt: "2023-09-20T13:10:00Z",
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    isAdmin: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    isAdmin: false,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@sunsetparadise.com",
    phone: "+1122334455",
    isAdmin: true,
  },
]

// Helper functions to simulate database operations
export function getAvailableRooms(checkIn: string, checkOut: string): Room[] {
  // In a real app, this would check bookings against the date range
  return rooms.filter((room) => room.available)
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id)
}

export function getUserBookings(userId: string): Booking[] {
  return bookings.filter((booking) => booking.userId === userId)
}

export function getAllBookings(): Booking[] {
  return bookings
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function validateUser(email: string, password: string): User | null {
  // In a real app, this would check hashed passwords
  // For demo purposes, any password works for existing emails
  const user = users.find((user) => user.email === email)
  return user || null
}
