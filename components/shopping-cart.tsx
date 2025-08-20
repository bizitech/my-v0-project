"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  service: {
    id: string
    name: string
    duration: number
    price: number
    home_service_price: number | null
  }
  staff: {
    id: string
    name: string
  } | null
  quantity: number
  price: number
  service_type: "salon" | "home"
}

interface ShoppingCartProps {
  salonId: string
  onCheckout: (cartItems: CartItem[], total: number) => void
}

export function ShoppingCart({ salonId, onCheckout }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchCartItems()
  }, [salonId])

  const fetchCartItems = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: cart } = await supabase
        .from("shopping_cart")
        .select("id")
        .eq("user_id", user.id)
        .eq("salon_id", salonId)
        .single()

      if (cart) {
        const { data: items } = await supabase
          .from("cart_items")
          .select(`
            id,
            quantity,
            price,
            service_type,
            service:services(id, name, duration, price, home_service_price),
            staff:staff(id, name)
          `)
          .eq("cart_id", cart.id)

        setCartItems(items || [])
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeItem(itemId)
      return
    }

    try {
      const { error } = await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", itemId)

      if (!error) {
        setCartItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (!error) {
        setCartItems((items) => items.filter((item) => item.id !== itemId))
      }
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const clearCart = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: cart } = await supabase
        .from("shopping_cart")
        .select("id")
        .eq("user_id", user.id)
        .eq("salon_id", salonId)
        .single()

      if (cart) {
        await supabase.from("cart_items").delete().eq("cart_id", cart.id)

        setCartItems([])
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalDuration = cartItems.reduce((sum, item) => sum + item.service.duration * item.quantity, 0)

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button size="lg" disabled>
          <ShoppingBag className="w-5 h-5 mr-2" />
          Loading...
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Cart ({cartItems.length})
          {totalAmount > 0 && (
            <Badge variant="secondary" className="ml-2">
              Rs {totalAmount.toLocaleString()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  ×
                </Button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{item.service.name}</h3>
                            <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {item.staff && <p className="text-sm text-gray-600 mb-2">with {item.staff.name}</p>}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">Rs {(item.price * item.quantity).toLocaleString()}</p>
                              <Badge variant={item.service_type === "home" ? "secondary" : "outline"}>
                                {item.service_type === "home" ? "Home Service" : "In Salon"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total Duration:</span>
                      <span>
                        {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span>Rs {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-rose-600 hover:bg-rose-700"
                      onClick={() => {
                        onCheckout(cartItems, totalAmount)
                        setIsOpen(false)
                      }}
                    >
                      Proceed to Booking
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
