"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, validateUser, users } from "./data"
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("greenHotelUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = validateUser(email, password)

        if (foundUser) {
          setUser(foundUser)
          localStorage.setItem("greenHotelUser", JSON.stringify(foundUser))
          resolve(true)
        } else {
          resolve(false)
        }

        setIsLoading(false)
      }, 1000)
    })
  }

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = users.find((u) => u.email === email)

        if (existingUser) {
          resolve(false)
        } else {
          // Create new user
          const newUser: User = {
            id: String(users.length + 1),
            name,
            email,
            phone,
            isAdmin: false,
          }

          // In a real app, we would add this to the database
          // For demo, we'll just set it as the current user
          setUser(newUser)
          localStorage.setItem("greenHotelUser", JSON.stringify(newUser))
          resolve(true)
        }

        setIsLoading(false)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("greenHotelUser")
    router.push('/')
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
