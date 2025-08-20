"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Phone, Mail, Search, Check, X, Eye, AlertTriangle } from "lucide-react"

interface SalonManagementProps {
  salons: any[]
  pendingSalons: any[]
}

export function SalonManagement({ salons, pendingSalons }: SalonManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")

  const allSalons = [...salons, ...pendingSalons]

  const filteredSalons = allSalons.filter((salon) => {
    const matchesSearch =
      !searchQuery ||
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.area.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && salon.is_active && salon.is_verified) ||
      (statusFilter === "pending" && !salon.is_active) ||
      (statusFilter === "verified" && salon.is_verified) ||
      (statusFilter === "unverified" && !salon.is_verified)

    const matchesCity = cityFilter === "all" || salon.city === cityFilter

    return matchesSearch && matchesStatus && matchesCity
  })

  const cities = [...new Set(allSalons.map((s) => s.city))]

  const getStatusBadge = (salon: any) => {
    if (!salon.is_active) return <Badge variant="secondary">Pending Approval</Badge>
    if (!salon.is_verified) return <Badge variant="outline">Unverified</Badge>
    return <Badge variant="default">Active</Badge>
  }

  const SalonCard = ({ salon }: { salon: any }) => (
    <Card key={salon.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg">{salon.name}</h3>
              {getStatusBadge(salon)}
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {salon.address}, {salon.area}, {salon.city}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{salon.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{salon.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {salon.rating} ({salon.total_reviews} reviews)
                </span>
              </div>

              <p className="text-gray-600">{salon.description}</p>

              {salon.salon_owners?.[0] && (
                <p className="text-sm">
                  <strong>Owner:</strong> {salon.salon_owners[0].full_name}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
            {!salon.is_active && (
              <div className="flex gap-2">
                <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}

            {salon.is_active && !salon.is_verified && (
              <Button size="sm" variant="outline" className="text-blue-600 bg-transparent">
                <Check className="h-4 w-4 mr-1" />
                Verify
              </Button>
            )}

            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>

            {salon.is_active && (
              <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Suspend
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Salon Management</h2>
        <p className="text-gray-600">Manage salon registrations, approvals, and verification</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search salons by name, city, or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Salons</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Salon Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Salons ({filteredSalons.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingSalons.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({salons.filter((s) => s.is_active).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div>
            {filteredSalons.length > 0 ? (
              filteredSalons.map((salon) => <SalonCard key={salon.id} salon={salon} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No salons found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div>
            {pendingSalons.length > 0 ? (
              pendingSalons.map((salon) => <SalonCard key={salon.id} salon={salon} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No pending approvals</h3>
                  <p className="text-gray-600">All salon registrations have been processed.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div>
            {salons
              .filter((s) => s.is_active)
              .map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
