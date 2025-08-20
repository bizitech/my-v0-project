"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Plus, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  home_service_price: number | null
  image_url: string | null
}

interface Staff {
  id: string
  name: string
}

interface ServiceCardWithCartProps {
  service: Service
  staff: Staff[]
  salonId: string
  onAddedToCart?: () => void
}

export function ServiceCardWithCart({ service, staff, salonId, onAddedToCart }: ServiceCardWithCartProps) {
  const [selectedStaff, setSelectedStaff] = useState<string>("")
  const [serviceType, setServiceType] = useState<"salon" | "home">("salon")
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const supabase = createClient()

  const addToCart = async () => {
    try {
      setIsAdding(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        // Redirect to login or show login modal
        return
      }

      // Get or create cart
      let { data: cart } = await supabase
        .from("shopping_cart")
        .select("id")
        .eq("user_id", user.id)
        .eq("salon_id", salonId)
        .single()

      if (!cart) {
        const { data: newCart } = await supabase
          .from("shopping_cart")
          .insert({
            user_id: user.id,
            salon_id: salonId,
          })
          .select("id")
          .single()
        cart = newCart
      }

      if (cart) {
        const price = serviceType === "home" ? service.price + (service.home_service_price || 0) : service.price

        // Check if item already exists in cart
        const { data: existingItem } = await supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("cart_id", cart.id)
          .eq("service_id", service.id)
          .eq("staff_id", selectedStaff || null)
          .eq("service_type", serviceType)
          .single()

        if (existingItem) {
          // Update quantity
          await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + 1 })
            .eq("id", existingItem.id)
        } else {
          // Add new item
          await supabase.from("cart_items").insert({
            cart_id: cart.id,
            service_id: service.id,
            staff_id: selectedStaff || null,
            quantity: 1,
            price: price,
            service_type: serviceType,
          })
        }

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
        onAddedToCart?.()
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const currentPrice = serviceType === "home" ? service.price + (service.home_service_price || 0) : service.price

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {service.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={service.image_url || "/placeholder.svg"}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{service.name}</span>
          <div className="text-right">
            <div className="text-lg font-bold text-rose-600">Rs {currentPrice.toLocaleString()}</div>
            {serviceType === "home" && service.home_service_price && (
              <div className="text-xs text-gray-500">+Rs {service.home_service_price} home service</div>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{service.description}</p>

        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {service.duration} minutes
        </div>

        {/* Service Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Service Location:</label>
          <div className="flex space-x-2">
            <Button
              variant={serviceType === "salon" ? "default" : "outline"}
              size="sm"
              onClick={() => setServiceType("salon")}
              className="flex-1"
            >
              In Salon
            </Button>
            {service.home_service_price !== null && (
              <Button
                variant={serviceType === "home" ? "default" : "outline"}
                size="sm"
                onClick={() => setServiceType("home")}
                className="flex-1"
              >
                <MapPin className="w-3 h-3 mr-1" />
                Home Service
              </Button>
            )}
          </div>
        </div>

        {/* Staff Selection */}
        {staff.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose Specialist (Optional):</label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="">Any Available</option>
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button onClick={addToCart} disabled={isAdding || isAdded} className="w-full bg-rose-600 hover:bg-rose-700">
          {isAdded ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              {isAdding ? "Adding..." : "Add to Cart"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
