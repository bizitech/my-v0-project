"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, X } from "lucide-react"

interface ServiceArea {
  id: string
  area_name: string
  city: string
  delivery_fee: number
  min_order_amount: number
  estimated_travel_time: number
}

interface LocationServiceAreaProps {
  salonId: string
  serviceAreas: ServiceArea[]
  onUpdateServiceAreas: (areas: ServiceArea[]) => void
}

export function LocationServiceArea({ salonId, serviceAreas, onUpdateServiceAreas }: LocationServiceAreaProps) {
  const [isAddingArea, setIsAddingArea] = useState(false)
  const [newArea, setNewArea] = useState({
    area_name: "",
    city: "",
    delivery_fee: 0,
    min_order_amount: 0,
    estimated_travel_time: 30,
  })

  const handleAddArea = () => {
    if (!newArea.area_name || !newArea.city) return

    const area: ServiceArea = {
      id: `temp_${Date.now()}`,
      ...newArea,
    }

    onUpdateServiceAreas([...serviceAreas, area])
    setNewArea({
      area_name: "",
      city: "",
      delivery_fee: 0,
      min_order_amount: 0,
      estimated_travel_time: 30,
    })
    setIsAddingArea(false)
  }

  const handleRemoveArea = (areaId: string) => {
    onUpdateServiceAreas(serviceAreas.filter((area) => area.id !== areaId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Home Service Areas
        </CardTitle>
        <p className="text-sm text-gray-600">Manage the areas where you provide home services</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Service Areas */}
        <div className="space-y-3">
          {serviceAreas.map((area) => (
            <div key={area.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{area.area_name}</h4>
                  <Badge variant="outline">{area.city}</Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Delivery Fee: PKR {area.delivery_fee}</p>
                  <p>Min Order: PKR {area.min_order_amount}</p>
                  <p>Travel Time: ~{area.estimated_travel_time} mins</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveArea(area.id)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Area Form */}
        {isAddingArea ? (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="area_name">Area Name</Label>
                <Input
                  id="area_name"
                  value={newArea.area_name}
                  onChange={(e) => setNewArea({ ...newArea, area_name: e.target.value })}
                  placeholder="e.g., DHA Phase 5"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newArea.city}
                  onChange={(e) => setNewArea({ ...newArea, city: e.target.value })}
                  placeholder="e.g., Karachi"
                />
              </div>
              <div>
                <Label htmlFor="delivery_fee">Delivery Fee (PKR)</Label>
                <Input
                  id="delivery_fee"
                  type="number"
                  value={newArea.delivery_fee}
                  onChange={(e) => setNewArea({ ...newArea, delivery_fee: Number(e.target.value) })}
                  placeholder="200"
                />
              </div>
              <div>
                <Label htmlFor="min_order_amount">Minimum Order (PKR)</Label>
                <Input
                  id="min_order_amount"
                  type="number"
                  value={newArea.min_order_amount}
                  onChange={(e) => setNewArea({ ...newArea, min_order_amount: Number(e.target.value) })}
                  placeholder="1000"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="estimated_travel_time">Estimated Travel Time (minutes)</Label>
                <Input
                  id="estimated_travel_time"
                  type="number"
                  value={newArea.estimated_travel_time}
                  onChange={(e) => setNewArea({ ...newArea, estimated_travel_time: Number(e.target.value) })}
                  placeholder="30"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddArea}>Add Area</Button>
              <Button variant="outline" onClick={() => setIsAddingArea(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsAddingArea(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Service Area
          </Button>
        )}

        {serviceAreas.length === 0 && !isAddingArea && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No service areas configured</p>
            <p className="text-sm">Add areas where you provide home services</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
