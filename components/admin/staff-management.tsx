"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCheck, Plus, Edit, Mail, Phone, Star } from "lucide-react"

interface StaffManagementProps {
  staff: any[]
}

export function StaffManagement({ staff }: StaffManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const categories = [
    { value: "facial", label: "Facial Treatments" },
    { value: "hair", label: "Hair Services" },
    { value: "makeup", label: "Makeup" },
    { value: "nails", label: "Nail Care" },
    { value: "massage", label: "Body Treatments" },
    { value: "waxing", label: "Waxing" },
  ]

  const StaffForm = ({ staff, onClose }: { staff?: any; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: staff?.name || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      specialties: staff?.specialties || [],
      is_available: staff?.is_available ?? true,
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // In a real app, this would make an API call to create/update the staff member
      console.log("Staff data:", formData)
      onClose()
    }

    const toggleSpecialty = (specialty: string) => {
      setFormData({
        ...formData,
        specialties: formData.specialties.includes(specialty)
          ? formData.specialties.filter((s: string) => s !== specialty)
          : [...formData.specialties, specialty],
      })
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+92-300-1234567"
          />
        </div>

        <div className="space-y-3">
          <Label>Specialties</Label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={category.value}
                  checked={formData.specialties.includes(category.value)}
                  onChange={() => toggleSpecialty(category.value)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor={category.value} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is_available">Available for Bookings</Label>
            <p className="text-sm text-muted-foreground">Allow customers to book with this staff member</p>
          </div>
          <Switch
            id="is_available"
            checked={formData.is_available}
            onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            {staff ? "Update Staff" : "Add Staff"}
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
              <UserCheck className="h-5 w-5" />
              Staff Management
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <StaffForm onClose={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.map((member) => {
              const initials = member.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()

              return (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Staff Member</DialogTitle>
                            </DialogHeader>
                            <StaffForm staff={member} onClose={() => {}} />
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{member.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties?.map((specialty: string) => (
                            <Badge key={specialty} variant="secondary" className="text-xs capitalize">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <Badge variant={member.is_available ? "default" : "secondary"}>
                          {member.is_available ? "Available" : "Unavailable"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">5+ years exp.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
