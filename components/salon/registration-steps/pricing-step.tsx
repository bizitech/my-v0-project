"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, DollarSign } from "lucide-react"
import type { SalonRegistrationData, SalonService } from "../salon-registration-flow"

interface PricingStepProps {
  data: SalonRegistrationData
  updateData: (data: Partial<SalonRegistrationData>) => void
  onNext: () => void
  onPrev: () => void
}

const commonServices = [
  { name: "Haircut", category: "Hair", duration: 45 },
  { name: "Hair Wash & Blow Dry", category: "Hair", duration: 30 },
  { name: "Hair Color", category: "Hair", duration: 120 },
  { name: "Facial Treatment", category: "Skincare", duration: 60 },
  { name: "Eyebrow Threading", category: "Eyebrows", duration: 15 },
  { name: "Manicure", category: "Nails", duration: 45 },
  { name: "Pedicure", category: "Nails", duration: 60 },
  { name: "Bridal Makeup", category: "Makeup", duration: 180 },
  { name: "Party Makeup", category: "Makeup", duration: 90 },
  { name: "Henna Application", category: "Henna", duration: 120 },
]

export function PricingStep({ data, updateData, onNext, onPrev }: PricingStepProps) {
  const [newService, setNewService] = useState<Partial<SalonService>>({
    name: "",
    category: "",
    salonPrice: 0,
    homePrice: 0,
    duration: 30,
    description: "",
  })

  const addService = () => {
    if (newService.name && newService.category && newService.salonPrice) {
      const service: SalonService = {
        id: Date.now().toString(),
        name: newService.name,
        category: newService.category,
        salonPrice: newService.salonPrice || 0,
        homePrice: newService.homePrice || 0,
        duration: newService.duration || 30,
        description: newService.description || "",
      }

      updateData({ services: [...data.services, service] })
      setNewService({
        name: "",
        category: "",
        salonPrice: 0,
        homePrice: 0,
        duration: 30,
        description: "",
      })
    }
  }

  const removeService = (id: string) => {
    updateData({ services: data.services.filter((s) => s.id !== id) })
  }

  const addCommonService = (commonService: (typeof commonServices)[0]) => {
    const service: SalonService = {
      id: Date.now().toString(),
      name: commonService.name,
      category: commonService.category,
      salonPrice: 0,
      homePrice: 0,
      duration: commonService.duration,
      description: "",
    }
    updateData({ services: [...data.services, service] })
  }

  const updateService = (id: string, updates: Partial<SalonService>) => {
    updateData({
      services: data.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })
  }

  const isValid = data.services.length > 0 && data.services.every((s) => s.salonPrice > 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Pricing</h2>
        <p className="text-gray-600">Set up your services with pricing for both salon and home visits.</p>
      </div>

      {/* Quick Add Common Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Add Popular Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonServices.map((service) => (
              <Button
                key={service.name}
                variant="outline"
                size="sm"
                onClick={() => addCommonService(service)}
                className="justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                {service.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Custom Service */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Custom Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="e.g., Deep Cleansing Facial"
              />
            </div>
            <div>
              <Label htmlFor="serviceCategory">Category</Label>
              <Select
                value={newService.category}
                onValueChange={(value) => setNewService({ ...newService, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hair">Hair</SelectItem>
                  <SelectItem value="Skincare">Skincare</SelectItem>
                  <SelectItem value="Makeup">Makeup</SelectItem>
                  <SelectItem value="Nails">Nails</SelectItem>
                  <SelectItem value="Eyebrows">Eyebrows & Lashes</SelectItem>
                  <SelectItem value="Henna">Henna</SelectItem>
                  <SelectItem value="Massage">Massage</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salonPrice">Salon Price (PKR)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="salonPrice"
                  type="number"
                  value={newService.salonPrice}
                  onChange={(e) => setNewService({ ...newService, salonPrice: Number.parseInt(e.target.value) || 0 })}
                  placeholder="1500"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="homePrice">Home Service Price (PKR)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="homePrice"
                  type="number"
                  value={newService.homePrice}
                  onChange={(e) => setNewService({ ...newService, homePrice: Number.parseInt(e.target.value) || 0 })}
                  placeholder="2000"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: Number.parseInt(e.target.value) || 30 })}
                placeholder="60"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              placeholder="Brief description of the service..."
              rows={2}
            />
          </div>

          <Button onClick={addService} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>

      {/* Added Services List */}
      {data.services.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Services ({data.services.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-500">
                        {service.category} • {service.duration} minutes
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(service.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`salon-${service.id}`}>Salon Price (PKR)</Label>
                      <Input
                        id={`salon-${service.id}`}
                        type="number"
                        value={service.salonPrice}
                        onChange={(e) =>
                          updateService(service.id, { salonPrice: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="1500"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`home-${service.id}`}>Home Service Price (PKR)</Label>
                      <Input
                        id={`home-${service.id}`}
                        type="number"
                        value={service.homePrice}
                        onChange={(e) => updateService(service.id, { homePrice: Number.parseInt(e.target.value) || 0 })}
                        placeholder="2000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <div className="flex flex-col items-end">
          {!isValid && (
            <p className="text-sm text-red-500 mb-2">
              {data.services.length === 0
                ? "Please add at least one service to continue"
                : "Please set prices for all services"}
            </p>
          )}
          <Button onClick={onNext} disabled={!isValid} className={!isValid ? "opacity-50 cursor-not-allowed" : ""}>
            Continue to Verification
          </Button>
        </div>
      </div>
    </div>
  )
}
