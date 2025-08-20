"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { SalonRegistrationData } from "../salon-registration-flow"

interface BasicInfoStepProps {
  data: SalonRegistrationData
  updateData: (data: Partial<SalonRegistrationData>) => void
  onNext: () => void
}

export function BasicInfoStep({ data, updateData, onNext }: BasicInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isValid = data.salonName && data.ownerName && data.email && data.phone

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Tell us about your salon and yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="salonName">Salon Name *</Label>
          <Input
            id="salonName"
            value={data.salonName}
            onChange={(e) => updateData({ salonName: e.target.value })}
            placeholder="e.g., Glamour Beauty Studio"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name *</Label>
          <Input
            id="ownerName"
            value={data.ownerName}
            onChange={(e) => updateData({ ownerName: e.target.value })}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="+92-300-1234567"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Salon Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Describe your salon, services, and what makes you special..."
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isValid} className="px-8">
          Continue
        </Button>
      </div>
    </form>
  )
}
