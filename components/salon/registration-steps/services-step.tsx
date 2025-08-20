"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import type { SalonRegistrationData } from "../salon-registration-flow"

interface ServicesStepProps {
  data: SalonRegistrationData
  updateData: (data: Partial<SalonRegistrationData>) => void
  onNext: () => void
  onPrev: () => void
}

const salonCategories = [
  { id: "beauty_parlor", label: "Beauty Parlor", description: "General beauty services" },
  { id: "hair_salon", label: "Hair Salon", description: "Hair cutting, styling, coloring" },
  { id: "facial_spa", label: "Facial & Spa", description: "Facial treatments and spa services" },
  { id: "nail_studio", label: "Nail Studio", description: "Manicure, pedicure, nail art" },
  { id: "bridal_makeup", label: "Bridal Makeup", description: "Wedding and event makeup" },
  { id: "threading_waxing", label: "Threading & Waxing", description: "Hair removal services" },
]

const amenities = [
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

export function ServicesStep({ data, updateData, onNext, onPrev }: ServicesStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked ? [...data.categories, categoryId] : data.categories.filter((id) => id !== categoryId)
    updateData({ categories: newCategories })
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    const newAmenities = checked ? [...data.amenities, amenityId] : data.amenities.filter((id) => id !== amenityId)
    updateData({ amenities: newAmenities })
  }

  const handleHoursChange = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    const newHours = {
      ...data.openingHours,
      [day]: {
        ...data.openingHours[day],
        [field]: value,
      },
    }
    updateData({ openingHours: newHours })
  }

  const isValid = data.categories.length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Services & Schedule</h2>
        <p className="text-gray-600">What services do you offer and when are you open?</p>
      </div>

      {/* Service Categories */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Service Categories *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {salonCategories.map((category) => (
            <div key={category.id} className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id={category.id}
                checked={data.categories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor={category.id} className="font-medium cursor-pointer">
                  {category.label}
                </Label>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Amenities</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-3">
              <Checkbox
                id={amenity.id}
                checked={data.amenities.includes(amenity.id)}
                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
              />
              <Label htmlFor={amenity.id} className="cursor-pointer">
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Opening Hours */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Opening Hours</Label>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day.key} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-24">
                <Label className="font-medium">{day.label}</Label>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Checkbox
                  id={`${day.key}-closed`}
                  checked={data.openingHours[day.key]?.closed || false}
                  onCheckedChange={(checked) => handleHoursChange(day.key, "closed", checked as boolean)}
                />
                <Label htmlFor={`${day.key}-closed`} className="text-sm">
                  Closed
                </Label>
              </div>
              {!data.openingHours[day.key]?.closed && (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={data.openingHours[day.key]?.open || "09:00"}
                    onChange={(e) => handleHoursChange(day.key, "open", e.target.value)}
                    className="w-32"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="time"
                    value={data.openingHours[day.key]?.close || "18:00"}
                    onChange={(e) => handleHoursChange(day.key, "close", e.target.value)}
                    className="w-32"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit" disabled={!isValid} className="px-8">
          Continue
        </Button>
      </div>
    </form>
  )
}
