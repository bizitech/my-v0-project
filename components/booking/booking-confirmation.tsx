import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, User, MapPin, Home, Phone, Mail, CreditCard } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

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
}

interface BookingConfirmationProps {
  bookingData: BookingData
}

export function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  const { service, isHomeService, selectedDate, selectedTime, selectedStaff, paymentMethod } = bookingData

  if (!service || !selectedDate || !selectedTime || !selectedStaff) {
    return <div>Missing booking information</div>
  }

  const totalAmount = service.price + (isHomeService && service.is_home_service ? service.home_service_fee : 0)
  const bookingId = `BB${Date.now().toString().slice(-6)}`

  const getPaymentMethodDisplay = (method?: string) => {
    switch (method) {
      case "jazzcash":
        return "JazzCash"
      case "easypaisa":
        return "EasyPaisa"
      case "bank_transfer":
        return "Bank Transfer"
      case "cash_on_service":
        return "Cash on Service"
      default:
        return "Cash on Service"
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="inline-flex p-4 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your appointment has been successfully booked. We'll send you a confirmation shortly.
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Booking ID: {bookingId}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Service</p>
                  <p className="text-sm text-muted-foreground">{service.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedTime} ({service.duration} minutes)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Beautician</p>
                  <p className="text-sm text-muted-foreground">{selectedStaff.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
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

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">{getPaymentMethodDisplay(paymentMethod)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Total Amount</p>
                  <p className="text-sm font-semibold text-primary">PKR {totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Confirmation Call</p>
                <p className="text-muted-foreground">We'll call you within 30 minutes to confirm your appointment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Preparation</p>
                <p className="text-muted-foreground">
                  {isHomeService
                    ? "Ensure your address is accessible and prepare the service area."
                    : "Arrive 10 minutes early at our salon."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Payment</p>
                <p className="text-muted-foreground">
                  {paymentMethod === "cash_on_service"
                    ? "Payment will be collected at the time of service."
                    : paymentMethod === "bank_transfer"
                      ? "Please complete the bank transfer and share the receipt."
                      : "Payment has been processed successfully."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">Call us: +92-300-BEAUTY1</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">Email: info@bellabeauty.pk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1 bg-transparent">
          <Link href="/booking">Book Another Appointment</Link>
        </Button>
      </div>
    </div>
  )
}
