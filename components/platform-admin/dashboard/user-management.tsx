"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, MapPin, Calendar, Search, Eye, Ban } from "lucide-react"

interface UserManagementProps {
  customers: any[]
  salons: any[]
}

export function UserManagement({ customers, salons }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const salonOwners = salons.map((salon) => salon.salon_owners?.[0]).filter(Boolean)

  const filteredCustomers = customers.filter(
    (customer) =>
      !searchQuery ||
      customer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSalonOwners = salonOwners.filter(
    (owner) =>
      !searchQuery ||
      owner.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.phone?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const UserCard = ({ user, type }: { user: any; type: "customer" | "owner" }) => (
    <Card key={user.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <h3 className="font-medium">{user.full_name || "No name provided"}</h3>
              <Badge variant={type === "owner" ? "default" : "secondary"}>
                {type === "owner" ? "Salon Owner" : "Customer"}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              )}

              {user.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.address}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View Profile
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
              <Ban className="h-4 w-4 mr-1" />
              Suspend
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-gray-600">Manage customers and salon owners on the platform</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salon Owners</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salonOwners.length}</div>
            <p className="text-xs text-muted-foreground">business owners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter((c) => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <p className="text-xs text-muted-foreground">new registrations</p>
          </CardContent>
        </Card>
      </div>

      {/* User Tabs */}
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customers">Customers ({filteredCustomers.length})</TabsTrigger>
          <TabsTrigger value="owners">Salon Owners ({filteredSalonOwners.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <div>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => <UserCard key={customer.id} user={customer} type="customer" />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No customers found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="owners">
          <div>
            {filteredSalonOwners.length > 0 ? (
              filteredSalonOwners.map((owner) => <UserCard key={owner.id} user={owner} type="owner" />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No salon owners found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
