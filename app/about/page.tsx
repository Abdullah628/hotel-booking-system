import { MainNav } from "@/components/main-nav"
import { Hotel, Star, Award, Users, Utensils, Dumbbell, Wifi, Car } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <MainNav />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg?height=400&width=1200" alt="Luxury Hotel" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Sunset Paradise Hotel</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Experience luxury and comfort in the heart of the city since 1985
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 1985, Sunset Paradise Hotel began as a small family-owned establishment with just 15 rooms.
              Today, we've grown into a luxury destination with over 200 rooms, while maintaining the warm, personalized
              service that has been our hallmark from the beginning.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, Elizabeth Chen, had a vision to create a space where travelers could feel completely at home
              while enjoying world-class amenities. That vision continues to guide us as we evolve and grow.
            </p>
            <p className="text-gray-600">
              Over the decades, we've welcomed guests from all corners of the world, from business travelers to
              vacationing families, celebrities, and dignitaries. Each guest has contributed to our rich history and
              helped shape the Sunset Paradise experience.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image src="https://itsc3000.wordpress.com/wp-content/uploads/2016/04/jnbk.jpg?height=400&width=600" alt="Hotel History" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-8 rounded-xl text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every detail, from the quality of our beds to the smile that greets you at
                reception.
              </p>
            </div>

            <div className="bg-emerald-50 p-8 rounded-xl text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Hospitality</h3>
              <p className="text-gray-600">
                True hospitality means anticipating needs before they arise and creating memorable experiences for every
                guest.
              </p>
            </div>

            <div className="bg-emerald-50 p-8 rounded-xl text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to sustainable practices that minimize our environmental footprint while maximizing
                guest comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Hotel Amenities</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Utensils className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">Fine Dining</h3>
            </div>
            <p className="text-gray-600">
              Our award-winning restaurant offers gourmet cuisine prepared by world-class chefs using locally-sourced
              ingredients.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">Fitness Center</h3>
            </div>
            <p className="text-gray-600">
              Stay fit during your stay with our state-of-the-art fitness center, open 24/7 for your convenience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Wifi className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">High-Speed WiFi</h3>
            </div>
            <p className="text-gray-600">
              Stay connected with complimentary high-speed WiFi available throughout the hotel and in all guest rooms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Car className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">Valet Parking</h3>
            </div>
            <p className="text-gray-600">
              Enjoy the convenience of our valet parking service, with secure parking facilities for all guests.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Meet Our Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="https://abdullah628.vercel.app/static/0aafd36ad33aa66493e977d188ff5554/54f6b/me.avif?height=200&width=200" alt="Hotel Manager" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">Michael Rodriguez</h3>
              <p className="text-green-500 mb-3">General Manager</p>
              <p className="text-gray-600">
                With over 20 years in luxury hospitality, Michael ensures every aspect of your stay exceeds
                expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="https://www.hakuhodo-global.com/wp_admin/wp-content/uploads/2017/06/H20170601_campaign_takigawa_01.jpg?height=200&width=200" alt="Chef" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">Sophia Chen</h3>
              <p className="text-green-500 mb-3">Executive Chef</p>
              <p className="text-gray-600">
                Award-winning Chef Sophia brings culinary excellence to our restaurant with her innovative approach to
                fine dining.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="https://media.istockphoto.com/id/1411428110/photo/young-businessman-portrait.jpg?s=612x612&w=0&k=20&c=t4Pd4t9opr2Be1w4Zhonf75Ys2jbfKZrQbDzKnvvqeg=" alt="Concierge" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-1">James Thompson</h3>
              <p className="text-green-500 mb-3">Head Concierge</p>
              <p className="text-gray-600">
                James and his concierge team are dedicated to making your stay memorable with personalized
                recommendations and assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">Awards & Recognition</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Five Star Excellence</h3>
            <p className="text-sm text-gray-600">2023</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Best Luxury Hotel</h3>
            <p className="text-sm text-gray-600">2022</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Sustainable Tourism</h3>
            <p className="text-sm text-gray-600">2021</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Culinary Excellence</h3>
            <p className="text-sm text-gray-600">2020</p>
          </div>
        </div>
      </section>

      <footer className="bg-green-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="h-6 w-6" />
                <span className="text-xl font-bold">Sunset Paradise</span>
              </div>
              <p className="text-green-100">
                Luxury accommodations for business and leisure travelers in the heart of the city.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/rooms" className="text-green-100 hover:text-white">
                    Rooms
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-green-100 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-green-100 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-green-100 hover:text-white">
                    Login
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-green-100">
                <p>123 Sunset Boulevard</p>
                <p>Paradise City, PC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@sunsetparadise.com</p>
              </address>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-green-100 mb-2">Subscribe to get special offers and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-r-md">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="border-t border-green-500 mt-8 pt-6 text-center text-green-100">
            &copy; {new Date().getFullYear()} Sunset Paradise Hotel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
