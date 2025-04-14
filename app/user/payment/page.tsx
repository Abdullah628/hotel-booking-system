"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentCard {
  id: string
  cardNumber: string
  cardHolder: string
  expiryDate: string
}

export default function PaymentsPage() {
  const { toast } = useToast()
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: "1",
      cardNumber: "**** **** **** 4242",
      cardHolder: "John Doe",
      expiryDate: "12/25",
    },
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })

  const handleAddCard = () => {
    // Basic validation
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryDate || !newCard.cvv) {
      toast({
        title: "Missing information",
        description: "Please fill in all card details",
        variant: "destructive",
      })
      return
    }

    // Add new card
    const maskedNumber = "**** **** **** " + newCard.cardNumber.slice(-4)
    setCards([
      ...cards,
      {
        id: Date.now().toString(),
        cardNumber: maskedNumber,
        cardHolder: newCard.cardHolder,
        expiryDate: newCard.expiryDate,
      },
    ])

    // Reset form
    setNewCard({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    })
    setShowAddCard(false)

    toast({
      title: "Card added",
      description: "Your payment method has been added successfully",
    })
  }

  const handleRemoveCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
    toast({
      title: "Card removed",
      description: "Your payment method has been removed",
    })
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Payment Methods</h1>

      <div className="grid gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                <CardTitle>Credit Card</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleRemoveCard(card.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-lg font-medium">{card.cardNumber}</p>
                <p className="text-sm text-gray-500">
                  {card.cardHolder} • Expires {card.expiryDate}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {showAddCard ? (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle>Add New Card</CardTitle>
              <CardDescription>Enter your card details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardHolder">Card Holder Name</Label>
                <Input
                  id="cardHolder"
                  placeholder="John Doe"
                  value={newCard.cardHolder}
                  onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowAddCard(false)}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                Cancel
              </Button>
              <Button onClick={handleAddCard} className="bg-green-500 hover:bg-green-600 text-white">
                Add Card
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Button
            onClick={() => setShowAddCard(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
          >
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        )}
      </div>
    </div>
  )
}
