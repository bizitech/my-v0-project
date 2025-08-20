"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Star, Clock, Phone, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Salon {
  id: string
  name: string
  description: string
  address: string
  city: string
  area: string
  phone: string
  rating: number
  total_reviews: number
  images: string[]
  opening_hours: Record<string, { open: string; close: string; closed?: boolean }>
  salon_categories: { category: string }[]
  salon_amenities: { amenity: string }[]
}

interface SalonSearchProps {
  salons: Salon[]
  cities: string[]
}

const serviceCategories = [
  { id: "beauty_parlor", label: "Beauty Parlor" },
  { id: "hair_salon", label: "Hair Salon" },
  { id: "facial_spa", label: "Facial & Spa" },
  { id: "nail_studio", label: "Nail Studio" },
  { id: "bridal_makeup", label: "Bridal Makeup" },
  { id: "threading_waxing", label: "Threading & Waxing" },
]

export function SalonSearch({ salons, cities }: SalonSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all_cities")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)

  const filteredSalons = useMemo(() => {
    return salons.filter((salon) => {
      // Search query filter
      if (
        searchQuery &&
        !salon.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !salon.area.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !salon.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // City filter
      if (selectedCity !== "all_cities" && salon.city !== selectedCity) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const salonCategories = salon.salon_categories.map((c) => c.category)
        if (!selectedCategories.some((cat) => salonCategories.includes(cat))) {
          return false
        }
      }

      // Rating filter
      if (minRating > 0 && salon.rating < minRating) {
        return false
      }

      return true
    })
  }, [salons, searchQuery, selectedCity, selectedCategories, minRating])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const getCurrentStatus = (openingHours: Record<string, { open: string; close: string; closed?: boolean }>) => {
    const now = new Date()
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    const currentTime = now.toTimeString().substring(0, 5)

    const todayHours = openingHours[currentDay]

    if (todayHours?.closed) {
      return { isOpen: false, text: "Closed Today" }
    }

    if (todayHours && currentTime >= todayHours.open && currentTime <= todayHours.close) {
      return { isOpen: true, text: `Open until ${todayHours.close}` }
    }

    return { isOpen: false, text: "Closed" }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search salons by name, area, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_cities">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t space-y-6">
              <div>
                <h3 className="font-medium mb-3">Service Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                      />
                      <label htmlFor={category.id} className="text-sm cursor-pointer">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Minimum Rating</h3>
                <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredSalons.length} Salon{filteredSalons.length !== 1 ? "s" : ""} Found
        </h2>
      </div>

      {/* Salon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalons.map((salon) => {
          const status = getCurrentStatus(salon.opening_hours)
          return (
            <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={salon.images[0] || "/placeholder.svg?height=200&width=400&query=beauty salon interior"}
                  alt={salon.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={status.isOpen ? "default" : "secondary"} className="bg-white/90 text-gray-900">
                    <Clock className="h-3 w-3 mr-1" />
                    {status.text}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{salon.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {salon.area}, {salon.city}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{salon.rating}</span>
                    <span className="text-sm text-gray-500">({salon.total_reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{salon.description}</p>

                {/* Service Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {salon.salon_categories.slice(0, 3).map((cat, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cat.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ))}
                  {salon.salon_categories.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{salon.salon_categories.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Phone className="h-4 w-4" />
                  <span>{salon.phone}</span>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/salon/${salon.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/booking?salon=${salon.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredSalons.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No salons found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all available salons.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCity("all_cities")
                setSelectedCategories([])
                setMinRating(0)
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
