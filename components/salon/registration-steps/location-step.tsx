"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SalonRegistrationData } from "../salon-registration-flow"

interface LocationStepProps {
  data: SalonRegistrationData
  updateData: (data: Partial<SalonRegistrationData>) => void
  onNext: () => void
  onPrev: () => void
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

export function LocationStep({ data, updateData, onNext, onPrev }: LocationStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isValid = data.address && data.city && data.area

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Details</h2>
        <p className="text-gray-600">Where is your salon located?</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address">Complete Address *</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="Shop/Plot number, Street, Block, etc."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Select value={data.city} onValueChange={(value) => updateData({ city: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
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
            <Label htmlFor="area">Area/Locality *</Label>
            <Input
              id="area"
              value={data.area}
              onChange={(e) => updateData({ area: e.target.value })}
              placeholder="e.g., DHA, Gulberg, F-7"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => updateData({ postalCode: e.target.value })}
            placeholder="e.g., 54000"
          />
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
