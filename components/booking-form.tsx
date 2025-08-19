"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Home, CreditCard, Phone } from "lucide-react"

interface BookingFormProps {
  beautician: {
    name: string
    isAtHome: boolean
    isAtSalon: boolean
    salonAddress?: string
  }
}

export function BookingForm({ beautician }: BookingFormProps) {
  const [serviceLocation, setServiceLocation] = useState<"home" | "salon">("home")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    service: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Location Selection */}
        {beautician.isAtHome && beautician.isAtSalon && (
          <Tabs value={serviceLocation} onValueChange={(value) => setServiceLocation(value as "home" | "salon")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                At Home
              </TabsTrigger>
              <TabsTrigger value="salon" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                At Salon
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="font-medium">Contact Information</h3>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <Label htmlFor="service">Select Service *</Label>
          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bridal">Bridal Makeup Package - PKR 15,000</SelectItem>
              <SelectItem value="party">Party Makeup - PKR 5,000</SelectItem>
              <SelectItem value="hair">Hair Styling - PKR 3,000</SelectItem>
              <SelectItem value="facial">Facial Treatment - PKR 4,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Details */}
        {serviceLocation === "home" ? (
          <div className="space-y-2">
            <Label htmlFor="address">Your Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address including area and landmarks"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
            />
          </div>
        ) : (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Salon Address</p>
                <p className="text-sm text-muted-foreground">{beautician.salonAddress}</p>
              </div>
            </div>
          </div>
        )}

        {/* Special Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Special Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements or notes for the beautician"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            rows={2}
          />
        </div>

        {/* Booking Summary */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <h4 className="font-medium">Booking Summary</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Beautician:</span>
              <span>{beautician.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span>{serviceLocation === "home" ? "At Your Home" : "At Salon"}</span>
            </div>
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span>Please select above</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Book & Pay Now
          </Button>

          <Button variant="outline" className="w-full bg-transparent" size="lg">
            <Phone className="h-4 w-4 mr-2" />
            Call to Book
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By booking, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  )
}
