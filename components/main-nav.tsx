"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Hotel, LogOut, Menu } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MainNavProps {
  isAdmin?: boolean
}

export function MainNav({ isAdmin = false }: MainNavProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const userLinks = [
    { href: "/user/dashboard", label: "Dashboard" },
    { href: "/rooms", label: "Browse Rooms" },
    { href: "/user/bookings", label: "My Bookings" },
    { href: "/user/profile", label: "Profile" },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/rooms", label: "Manage Rooms" },
    { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/users", label: "Users" },
  ]

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const links = user?.isAdmin ? adminLinks : user ? userLinks : publicLinks

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Hotel className="h-6 w-6 text-green-500" />
            <Link href="/" className="text-xl font-bold text-green-600">
              Sunset Paradise
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-green-600",
                  pathname === link.href ? "text-green-600 border-b-2 border-green-500 pb-1" : "text-gray-600",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden md:inline-block text-sm font-medium text-gray-600">
                  {isAdmin ? "Admin Portal" : `Hello, ${user.name.split(" ")[0]}`}
                </span>
                <Button variant="ghost" size="sm" className="gap-2" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline-block">Logout</span>
                </Button>
              </>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-emerald-500 hover:bg-green-600" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-green-600",
                        pathname === link.href ? "text-green-600" : "text-gray-600",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {!user && (
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-emerald-500 hover:bg-green-600">Register</Button>
                      </Link>
                    </div>
                  )}

                  {user && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}
