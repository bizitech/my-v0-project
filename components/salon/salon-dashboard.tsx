"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SalonOverview } from "./dashboard/salon-overview"
import { SalonBookingManagement } from "./dashboard/salon-booking-management"
import { SalonServiceManagement } from "./dashboard/salon-service-management"
import { SalonStaffManagement } from "./dashboard/salon-staff-management"
import { SalonProfileSettings } from "./dashboard/salon-profile-settings"
import { SalonReviews } from "./dashboard/salon-reviews"
import { BarChart3, Calendar, Briefcase, UserCheck, Settings, Star } from "lucide-react"

interface SalonDashboardProps {
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
    is_verified: boolean
    is_active: boolean
    subscription_plan: string
  }
  bookings: any[]
  services: any[]
  staff: any[]
  customers: any[]
  reviews: any[]
}

export function SalonDashboard({ salon, bookings, services, staff, customers, reviews }: SalonDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              {salon.name}
              {salon.is_verified && (
                <Badge variant="default" className="bg-green-600">
                  Verified
                </Badge>
              )}
              {!salon.is_active && <Badge variant="destructive">Pending Approval</Badge>}
            </h1>
            <p className="text-muted-foreground">
              {salon.area}, {salon.city} •{" "}
              {salon.subscription_plan.charAt(0).toUpperCase() + salon.subscription_plan.slice(1)} Plan
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{salon.rating}</span>
            <span className="text-sm text-gray-500">({salon.total_reviews} reviews)</span>
          </div>
        </div>

        {/* Status Alert */}
        {!salon.is_active && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-yellow-800">
                  Your salon is pending approval. You can manage your profile and services, but customers cannot book
                  appointments yet.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Staff
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SalonOverview
              salon={salon}
              bookings={bookings}
              services={services}
              staff={staff}
              customers={customers}
              reviews={reviews}
            />
          </TabsContent>

          <TabsContent value="bookings">
            <SalonBookingManagement bookings={bookings} />
          </TabsContent>

          <TabsContent value="services">
            <SalonServiceManagement services={services} salonId={salon.id} />
          </TabsContent>

          <TabsContent value="staff">
            <SalonStaffManagement staff={staff} salonId={salon.id} />
          </TabsContent>

          <TabsContent value="reviews">
            <SalonReviews reviews={reviews} />
          </TabsContent>

          <TabsContent value="settings">
            <SalonProfileSettings salon={salon} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
