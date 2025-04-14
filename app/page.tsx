import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hotel, Star, MapPin, Coffee, Wifi, Tv, Wind, ArrowRight, Calendar, Users, CreditCard } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import { rooms } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  // Get featured rooms (first 3)
  const featuredRooms = rooms.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <MainNav />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg?height=700&width=1200" alt="Luxury Hotel" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Sunset Paradise Hotel</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Experience luxury, comfort, and unforgettable moments in the heart of paradise
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/rooms">
              <Button size="lg" className="bg-emerald-500 hover:bg-green-600 text-white">
                Explore Our Rooms
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm hover:text-green-500 text-white border-white"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="relative -mt-20 z-30 container mx-auto px-4">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-5 mb-2">
                <h2 className="text-xl font-semibold text-green-700">Quick Booking</h2>
                <p className="text-sm text-gray-500">Find your perfect room in seconds</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Check-in
                </label>
                <input type="date" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Check-out
                </label>
                <input type="date" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  Guests
                </label>
                <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  Room Type
                </label>
                <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                  <option>Any Type</option>
                  <option>Standard</option>
                  <option>Deluxe</option>
                  <option>Suite</option>
                  <option>Penthouse</option>
                </select>
              </div>

              <div className="flex items-end">
                <Link href="/rooms" className="w-full">
                  <Button className="w-full bg-emerald-500 hover:bg-green-600">Search Rooms</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Welcome Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome to Sunset Paradise</h2>
            <p className="text-gray-600 mb-6">
              Nestled in the heart of paradise, our luxury hotel offers an unparalleled experience of comfort, elegance,
              and exceptional service. Whether you're traveling for business or pleasure, our dedicated staff is
              committed to making your stay unforgettable.
            </p>
            <p className="text-gray-600 mb-6">
              From our exquisitely designed rooms to our world-class amenities, every aspect of Sunset Paradise is
              crafted to exceed your expectations and create memories that will last a lifetime.
            </p>
            <Link href="/about">
              <Button variant="outline" className="border-green-300 text-green-600 hover:bg-emerald-50">
                Discover Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image src="https://www.shutterstock.com/image-photo/beach-travel-couple-relaxing-on-600nw-2367785107.jpg?height=400&width=600" alt="Hotel Lobby" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Featured Accommodations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best of Sunset Paradise with our featured rooms and suites. Each space is designed for
            ultimate comfort and luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-56 w-full">
                <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  ${room.price}/night
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center text-xs bg-emerald-100 text-green-700 px-2 py-1 rounded-full"
                    >
                      {amenity === "Free Wi-Fi" && <Wifi className="h-3 w-3 mr-1" />}
                      {amenity === "Coffee Maker" && <Coffee className="h-3 w-3 mr-1" />}
                      {amenity === "Flat-screen TV" && <Tv className="h-3 w-3 mr-1" />}
                      {amenity === "Air Conditioning" && <Wind className="h-3 w-3 mr-1" />}
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="inline-flex items-center text-xs bg-emerald-100 text-green-700 px-2 py-1 rounded-full">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <Link href={`/rooms/${room.id}`}>
                  <Button className="w-full bg-emerald-500 hover:bg-green-600">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/rooms">
            <Button variant="outline" className="border-green-300 text-green-600 hover:bg-emerald-50">
              View All Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Experience Luxury</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the perfect combination of luxury, comfort, and convenience for your stay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover:bg-emerald-50 rounded-xl transition-colors">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Prime Location</h3>
              <p className="text-gray-600">
                Located in the heart of the city, with easy access to attractions, shopping, and dining.
              </p>
            </div>

            <div className="text-center p-6 hover:bg-emerald-50 rounded-xl transition-colors">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">5-Star Service</h3>
              <p className="text-gray-600">
                Our dedicated staff provides personalized service to ensure your stay exceeds expectations.
              </p>
            </div>

            <div className="text-center p-6 hover:bg-emerald-50 rounded-xl transition-colors">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Fine Dining</h3>
              <p className="text-gray-600">
                Enjoy gourmet dining options with our in-house restaurant and 24/7 room service.
              </p>
            </div>

            <div className="text-center p-6 hover:bg-emerald-50 rounded-xl transition-colors">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Modern Amenities</h3>
              <p className="text-gray-600">
                High-speed WiFi, smart room controls, and all the modern conveniences you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">What Our Guests Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied guests.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-green-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The Sunset Paradise exceeded all our expectations. The room was immaculate, the staff was incredibly
                attentive, and the amenities were top-notch. We'll definitely be back!"
              </p>
              <div>
                <p className="font-semibold text-gray-800">Sarah & James</p>
                <p className="text-sm text-gray-500">Honeymoon Stay</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-green-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "As a business traveler, I appreciate efficiency and comfort. The Executive Business Suite had
                everything I needed, and the staff was incredibly accommodating with my late check-in."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Michael Chen</p>
                <p className="text-sm text-gray-500">Business Trip</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-green-500 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Our family had an amazing time at the Paradise Family Villa. The kids loved the special amenities, and
                we appreciated having enough space for everyone. The hotel's location made it easy to explore the city."
              </p>
              <div>
                <p className="font-semibold text-gray-800">The Rodriguez Family</p>
                <p className="text-sm text-gray-500">Family Vacation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3bb38d] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Sunset Paradise?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Book your stay today and discover why our guests keep coming back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" className="bg-white text-green-600 hover:bg-emerald-100">
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-green-500 hover:bg-green-700 hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#00836C] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="h-6 w-6" />
                <span className="text-xl font-bold">Sunset Paradise</span>
              </div>
              <p className="text-white">
                Luxury accommodations for business and leisure travelers in the heart of paradise.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/rooms" className="text-green-200 hover:text-white">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-green-200 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-green-200 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-green-200 hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-green-200">
                <p>123 Sunset Boulevard</p>
                <p>Paradise City, PC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@sunsetparadise.com</p>
              </address>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-green-200 mb-2">Subscribe to get special offers and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-r-md">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-200">
            &copy; {new Date().getFullYear()} Sunset Paradise Hotel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
