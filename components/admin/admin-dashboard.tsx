"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { BookingManagement } from "@/components/admin/booking-management"
import { ServiceManagement } from "@/components/admin/service-management"
import { StaffManagement } from "@/components/admin/staff-management"
import { CustomerManagement } from "@/components/admin/customer-management"
import { BarChart3, Calendar, Users, Briefcase, UserCheck } from "lucide-react"

interface AdminDashboardProps {
  bookings: any[]
  services: any[]
  staff: any[]
  customers: any[]
}

export function AdminDashboard({ bookings, services, staff, customers }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your beauty parlor operations</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
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
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <DashboardOverview bookings={bookings} services={services} staff={staff} customers={customers} />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingManagement bookings={bookings} />
            </TabsContent>

            <TabsContent value="services">
              <ServiceManagement services={services} />
            </TabsContent>

            <TabsContent value="staff">
              <StaffManagement staff={staff} />
            </TabsContent>

            <TabsContent value="customers">
              <CustomerManagement customers={customers} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
