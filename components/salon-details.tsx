"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Clock, Phone, Mail, Wifi, Car, CreditCard, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SalonDetailsProps {
  salon: {
    id: string
    name: string
    description: string
    address: string
    city: string
    area: string
    phone: string
    email: string
    rating: number
    total_reviews: number
    images: string[]
    opening_hours: Record<string, { open: string; close: string; closed?: boolean }>
    salon_categories: { category: string }[]
    salon_amenities: { amenity: string }[]
    services: Array<{
      id: string
      name: string
      description: string
      duration: number
      price: number
      category: string
      is_home_service: boolean
      home_service_fee: number
    }>
    staff: Array<{
      id: string
      name: string
      specialties: string[]
    }>
    reviews: Array<{
      id: string
      rating: number
      comment: string
      created_at: string
      customers: { full_name: string }
    }>
  }
}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  card_payment: CreditCard,
  waiting_area: Users,
}

export function SalonDetails({ salon }: SalonDetailsProps) {
  const getCurrentStatus = () => {
    const now = new Date()
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    const currentTime = now.toTimeString().substring(0, 5)

    const todayHours = salon.opening_hours[currentDay]

    if (todayHours?.closed) {
      return { isOpen: false, text: "Closed Today" }
    }

    if (todayHours && currentTime >= todayHours.open && currentTime <= todayHours.close) {
      return { isOpen: true, text: `Open until ${todayHours.close}` }
    }

    return { isOpen: false, text: "Closed" }
  }

  const status = getCurrentStatus()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <Image
              src={salon.images[0] || "/placeholder.svg?height=400&width=600&query=beauty salon interior"}
              alt={salon.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{salon.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {salon.address}, {salon.area}, {salon.city}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{salon.rating}</span>
                  <span className="text-sm">({salon.total_reviews} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{salon.description}</p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {salon.salon_categories.map((cat, index) => (
                <Badge key={index} variant="secondary">
                  {cat.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Book Appointment</span>
                <Badge variant={status.isOpen ? "default" : "secondary"}>
                  <Clock className="h-3 w-3 mr-1" />
                  {status.text}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>{salon.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>{salon.email}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href={`/booking?salon=${salon.id}`}>Book Now</Link>
              </Button>

              <div className="text-center text-sm text-gray-500">Instant confirmation • No booking fees</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="hours">Hours & Info</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salon.services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="text-right">
                      <div className="font-bold text-primary">Rs {service.price}</div>
                      {service.is_home_service && (
                        <div className="text-xs text-gray-500">+Rs {service.home_service_fee} (Home)</div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{service.duration} minutes</span>
                    {service.is_home_service && (
                      <Badge variant="outline" className="text-xs">
                        Home Service Available
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salon.staff.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-2">{member.name}</h3>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Opening Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(salon.opening_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-1">
                      <span className="capitalize font-medium">{day}</span>
                      <span className="text-gray-600">
                        {hours.closed ? "Closed" : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {salon.salon_amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity.amenity] || Users
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-primary" />
                        <span className="text-sm capitalize">{amenity.amenity.replace("_", " ")}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {salon.reviews.length > 0 ? (
            <div className="space-y-4">
              {salon.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{review.customers.full_name}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">Be the first to leave a review for this salon!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
