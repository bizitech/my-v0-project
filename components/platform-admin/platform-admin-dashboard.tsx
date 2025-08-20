"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlatformOverview } from "./dashboard/platform-overview"
import { SalonManagement } from "./dashboard/salon-management"
import { UserManagement } from "./dashboard/user-management"
import { BookingAnalytics } from "./dashboard/booking-analytics"
import { ReviewModeration } from "./dashboard/review-moderation"
import { SystemSettings } from "./dashboard/system-settings"
import { BarChart3, Building2, Users, Calendar, Star, Settings, AlertTriangle } from "lucide-react"

interface PlatformAdminDashboardProps {
  salons: any[]
  customers: any[]
  bookings: any[]
  reviews: any[]
  pendingSalons: any[]
  recentRegistrations: any[]
}

export function PlatformAdminDashboard({
  salons,
  customers,
  bookings,
  reviews,
  pendingSalons,
  recentRegistrations,
}: PlatformAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Platform Administration
              <Badge variant="default" className="bg-purple-600">
                Super Admin
              </Badge>
            </h1>
            <p className="text-muted-foreground">Manage the entire beauty marketplace platform</p>
          </div>
          <div className="flex items-center gap-4">
            {pendingSalons.length > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {pendingSalons.length} Pending Approvals
              </Badge>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="salons" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Salons
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
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
            <PlatformOverview
              salons={salons}
              customers={customers}
              bookings={bookings}
              reviews={reviews}
              pendingSalons={pendingSalons}
              recentRegistrations={recentRegistrations}
            />
          </TabsContent>

          <TabsContent value="salons">
            <SalonManagement salons={salons} pendingSalons={pendingSalons} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement customers={customers} salons={salons} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingAnalytics bookings={bookings} />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewModeration reviews={reviews} />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
