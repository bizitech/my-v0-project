"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Briefcase, Plus, Edit, Trash2, Clock, Home } from "lucide-react"

interface ServiceManagementProps {
  services: any[]
}

const updateService = async (id: number, formData: FormData) => {
  // Placeholder for update service logic
}

const createService = async (formData: FormData) => {
  // Placeholder for create service logic
}

export function ServiceManagement({ services }: ServiceManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)

  const categories = [
    { value: "facial", label: "Facial Treatments" },
    { value: "hair", label: "Hair Services" },
    { value: "makeup", label: "Makeup" },
    { value: "nails", label: "Nail Care" },
    { value: "massage", label: "Body Treatments" },
    { value: "waxing", label: "Waxing" },
  ]

  const ServiceForm = ({ service, onClose }: { service?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: service?.name || "",
      description: service?.description || "",
      duration: service?.duration || 60,
      price: service?.price || 0,
      category: service?.category || "",
      is_home_service: service?.is_home_service || false,
      home_service_fee: service?.home_service_fee || 0,
      is_active: service?.is_active ?? true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const formDataObj = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value.toString())
        })

        if (service) {
          await updateService(service.id, formDataObj)
        } else {
          await createService(formDataObj)
        }

        onClose()
        // Refresh the page to show updated data
        window.location.reload()
      } catch (error) {
        console.error("Error saving service:", error)
        alert("Failed to save service. Please try again.")
      }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (PKR)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_home_service">Home Service Available</Label>
              <p className="text-sm text-muted-foreground">Allow this service to be booked as home service</p>
            </div>
            <Switch
              id="is_home_service"
              checked={formData.is_home_service}
              onCheckedChange={(checked) => setFormData({ ...formData, is_home_service: checked })}
            />
          </div>

          {formData.is_home_service && (
            <div className="space-y-2">
              <Label htmlFor="home_service_fee">Home Service Fee (PKR)</Label>
              <Input
                id="home_service_fee"
                type="number"
                value={formData.home_service_fee}
                onChange={(e) => setFormData({ ...formData, home_service_fee: Number.parseFloat(e.target.value) })}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_active">Active Service</Label>
              <p className="text-sm text-muted-foreground">Make this service available for booking</p>
            </div>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            {service ? "Update Service" : "Add Service"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Service Management
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <ServiceForm onClose={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="relative">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <Badge variant="secondary" className="capitalize mt-1">
                          {service.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                            </DialogHeader>
                            <ServiceForm service={service} onClose={() => {}} />
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Salon Price:</span>
                        <span className="font-semibold">PKR {service.price?.toLocaleString()}</span>
                      </div>
                      {service.is_home_service && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Home className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Home Service:</span>
                          </div>
                          <span className="font-semibold">
                            PKR {(service.price + service.home_service_fee)?.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {service.is_home_service && (
                        <Badge variant="outline" className="text-xs">
                          Home Available
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
