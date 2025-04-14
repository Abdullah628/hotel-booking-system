"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ExpressCheckinPage() {
  const { toast } = useToast()
  const [bookingReference, setBookingReference] = useState("")
  const [lastName, setLastName] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    // Basic validation
    if (!bookingReference || !lastName || !arrivalTime || !acceptTerms) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and accept the terms",
        variant: "destructive",
      })
      return
    }

    // Submit form
    setIsSubmitted(true)
    toast({
      title: "Check-in completed",
      description: "Your express check-in has been confirmed",
    })
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Express Check-in</h1>

      {isSubmitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <CardTitle>Check-in Confirmed</CardTitle>
            </div>
            <CardDescription>Your express check-in has been successfully processed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-green-100">
              <h3 className="font-medium text-green-700 mb-2">Check-in Details</h3>
              <p className="text-sm text-gray-600">Booking Reference: {bookingReference}</p>
              <p className="text-sm text-gray-600">Expected Arrival: {arrivalTime}</p>
              {specialRequests && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Special Requests:</p>
                  <p className="text-sm text-gray-600">{specialRequests}</p>
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded-md border border-green-100">
              <h3 className="font-medium text-green-700 mb-2">What's Next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Upon arrival, proceed directly to the express check-in counter</li>
                <li>• Present your ID and the credit card used for booking</li>
                <li>• Collect your room key and enjoy your stay</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsSubmitted(false)} className="bg-green-500 hover:bg-green-600 text-white w-full">
              Return to Express Check-in
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-green-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <CardTitle>Complete Your Express Check-in</CardTitle>
            </div>
            <CardDescription>
              Save time at the front desk by completing your check-in details in advance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookingReference">
                Booking Reference <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bookingReference"
                placeholder="Enter your booking reference number"
                value={bookingReference}
                onChange={(e) => setBookingReference(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Enter the last name on the booking"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">
                Expected Arrival Time <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={setArrivalTime}>
                <SelectTrigger className="border-green-200 focus:ring-green-500">
                  <SelectValue placeholder="Select your expected arrival time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12:00 - 14:00">12:00 - 14:00</SelectItem>
                  <SelectItem value="14:00 - 16:00">14:00 - 16:00</SelectItem>
                  <SelectItem value="16:00 - 18:00">16:00 - 18:00</SelectItem>
                  <SelectItem value="18:00 - 20:00">18:00 - 20:00</SelectItem>
                  <SelectItem value="After 20:00">After 20:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Input
                id="specialRequests"
                placeholder="Any special requests for your stay?"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="border-green-500 data-[state=checked]:bg-green-500"
              />
              <Label htmlFor="terms" className="text-sm">
                I confirm that the information provided is correct and I agree to the hotel's terms and conditions
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white w-full">
              Complete Express Check-in
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
