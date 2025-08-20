"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface SalonProfileSettingsProps {
  salon: any
}

const pakistaniCities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
]

const amenityOptions = [
  { id: "parking", label: "Parking Available" },
  { id: "wifi", label: "Free WiFi" },
  { id: "ac", label: "Air Conditioning" },
  { id: "waiting_area", label: "Comfortable Waiting Area" },
  { id: "refreshments", label: "Complimentary Refreshments" },
  { id: "private_rooms", label: "Private Treatment Rooms" },
  { id: "wheelchair_accessible", label: "Wheelchair Accessible" },
  { id: "card_payment", label: "Card Payment Accepted" },
]

const days = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
]

export function SalonProfileSettings({ salon }: SalonProfileSettingsProps) {
  const [basicInfo, setBasicInfo] = useState({
    name: salon.name,
    description: salon.description || "",
    phone: salon.phone,
    email: salon.email,
    address: salon.address,
    city: salon.city,
    area: salon.area,
    postal_code: salon.postal_code || "",
  })

  const [openingHours, setOpeningHours] = useState(salon.opening_hours || {})
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would call the server action to update salon info
    console.log("Basic info:", basicInfo)
  }

  const handleHoursSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would call the server action to update opening hours
    console.log("Opening hours:", openingHours)
  }

  const handleHoursChange = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setOpeningHours({
      ...openingHours,
      [day]: {
        ...openingHours[day],
        [field]: value,
      },
    })
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId])
    } else {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Salon Settings</h2>
        <p className="text-gray-600">Manage your salon profile and preferences</p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="hours">Opening Hours</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your salon's basic details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Salon Name</Label>
                    <Input
                      id="name"
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={basicInfo.phone}
                      onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={basicInfo.email}
                      onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select
                      value={basicInfo.city}
                      onValueChange={(value) => setBasicInfo({ ...basicInfo, city: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pakistaniCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Area/Locality</Label>
                    <Input
                      id="area"
                      value={basicInfo.area}
                      onChange={(e) => setBasicInfo({ ...basicInfo, area: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      value={basicInfo.postal_code}
                      onChange={(e) => setBasicInfo({ ...basicInfo, postal_code: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Input
                    id="address"
                    value={basicInfo.address}
                    onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={basicInfo.description}
                    onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
              <CardDescription>Set your salon's operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHoursSubmit} className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-24">
                      <Label className="font-medium">{day.label}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${day.key}-closed`}
                        checked={openingHours[day.key]?.closed || false}
                        onCheckedChange={(checked) => handleHoursChange(day.key, "closed", checked as boolean)}
                      />
                      <Label htmlFor={`${day.key}-closed`} className="text-sm">
                        Closed
                      </Label>
                    </div>
                    {!openingHours[day.key]?.closed && (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={openingHours[day.key]?.open || "09:00"}
                          onChange={(e) => handleHoursChange(day.key, "open", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          value={openingHours[day.key]?.close || "18:00"}
                          onChange={(e) => handleHoursChange(day.key, "close", e.target.value)}
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <Button type="submit">Save Hours</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle>Salon Amenities</CardTitle>
              <CardDescription>Select the amenities available at your salon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenityOptions.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                    />
                    <Label htmlFor={amenity.id} className="cursor-pointer">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
              <Button className="mt-4">Save Amenities</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-sm text-gray-600">
                      You are currently on the{" "}
                      <Badge variant="default">
                        {salon.subscription_plan.charAt(0).toUpperCase() + salon.subscription_plan.slice(1)}
                      </Badge>{" "}
                      plan
                    </p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Basic</CardTitle>
                      <CardDescription>Perfect for small salons</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">Free</div>
                      <ul className="text-sm space-y-1">
                        <li>• Up to 50 bookings/month</li>
                        <li>• Basic analytics</li>
                        <li>• Email support</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="text-lg">Premium</CardTitle>
                      <CardDescription>Most popular choice</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">Rs 2,999/mo</div>
                      <ul className="text-sm space-y-1">
                        <li>• Unlimited bookings</li>
                        <li>• Advanced analytics</li>
                        <li>• Priority support</li>
                        <li>• Marketing tools</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Enterprise</CardTitle>
                      <CardDescription>For large salon chains</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">Rs 9,999/mo</div>
                      <ul className="text-sm space-y-1">
                        <li>• Multiple locations</li>
                        <li>• Custom integrations</li>
                        <li>• Dedicated support</li>
                        <li>• White-label options</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
