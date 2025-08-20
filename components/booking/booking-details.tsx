"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, UserIcon, MapPin, Home, CreditCard, Loader2 } from "lucide-react"
import { PaymentSelection } from "./payment-selection"
import { format } from "date-fns"
import { useState } from "react"

interface Service {
  id: string
  name: string
  duration: number
  price: number
  is_home_service: boolean
  home_service_fee: number
}

interface Staff {
  id: string
  name: string
}

interface BookingData {
  service?: Service
  isHomeService: boolean
  selectedDate?: string
  selectedTime?: string
  selectedStaff?: Staff
  customerAddress?: string
  notes?: string
  paymentMethod?: string
  paymentDetails?: any
}

interface BookingDetailsProps {
  bookingData: BookingData
  user: any
  onUpdate: (updates: Partial<BookingData>) => void
  onConfirm: () => void
  isSubmitting: boolean
}

export function BookingDetails({ bookingData, user, onUpdate, onConfirm, isSubmitting }: BookingDetailsProps) {
  const [currentStep, setCurrentStep] = useState<"details" | "payment">("details")
  const { service, isHomeService, selectedDate, selectedTime, selectedStaff, customerAddress, notes, paymentMethod } =
    bookingData

  if (!service || !selectedDate || !selectedTime || !selectedStaff) {
    return <div>Missing booking information</div>
  }

  const servicePrice = service.price
  const homeServiceFee = isHomeService && service.is_home_service ? service.home_service_fee : 0
  const totalAmount = servicePrice + homeServiceFee

  const handlePaymentMethodSelect = (method: string, details?: any) => {
    onUpdate({ paymentMethod: method, paymentDetails: details })
    if (method === "cash_on_service") {
      // For cash on service, proceed directly to confirmation
      onConfirm()
    } else {
      // For other payment methods, you would integrate with payment gateway here
      // For demo purposes, we'll simulate payment processing
      setTimeout(() => {
        onConfirm()
      }, 2000)
    }
  }

  if (currentStep === "payment") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setCurrentStep("details")}>
            ← Back to Details
          </Button>
          <h2 className="text-xl font-semibold">Payment</h2>
        </div>

        <PaymentSelection
          totalAmount={totalAmount}
          onPaymentMethodSelect={handlePaymentMethodSelect}
          selectedMethod={paymentMethod}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Service</p>
                  <p className="text-sm text-muted-foreground">{service.name}</p>
                  <Badge variant="secondary" className="mt-1">
                    {service.duration} minutes
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Beautician</p>
                  <p className="text-sm text-muted-foreground">{selectedStaff.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {isHomeService ? (
                    <Home className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{isHomeService ? "Home Service" : "Salon"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Home Service Address */}
      {isHomeService && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Service Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter your complete address including area, city, and landmarks..."
                value={customerAddress || ""}
                onChange={(e) => onUpdate({ customerAddress: e.target.value })}
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground">
                Please provide a detailed address to help our beautician reach you easily.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Special Requests or Preferences (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific requirements, allergies, or preferences..."
              value={notes || ""}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pricing Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>PKR {servicePrice.toLocaleString()}</span>
            </div>
            {homeServiceFee > 0 && (
              <div className="flex justify-between">
                <span>Home Service Fee</span>
                <span>PKR {homeServiceFee.toLocaleString()}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span className="text-primary">PKR {totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proceed to Payment Button */}
      <Button
        onClick={() => setCurrentStep("payment")}
        disabled={isSubmitting || (isHomeService && !customerAddress?.trim())}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Payment
          </>
        )}
      </Button>
    </div>
  )
}
