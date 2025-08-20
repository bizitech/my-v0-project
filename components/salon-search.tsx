"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Star, Clock, Phone, Search, Filter, Navigation, Target } from "lucide-react"
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
  latitude?: number
  longitude?: number
  opening_hours: Record<string, { open: string; close: string; closed?: boolean }>
  salon_categories: { category: string }[]
  salon_amenities: { amenity: string }[]
}

interface SalonSearchProps {
  salons: Salon[]
  cities: string[]
}

interface UserLocation {
  latitude: number
  longitude: number
}

const serviceCategories = [
  { id: "beauty_parlor", label: "Beauty Parlor" },
  { id: "hair_salon", label: "Hair Salon" },
  { id: "facial_spa", label: "Facial & Spa" },
  { id: "nail_studio", label: "Nail Studio" },
  { id: "bridal_makeup", label: "Bridal Makeup" },
  { id: "threading_waxing", label: "Threading & Waxing" },
]

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function SalonSearch({ salons, cities }: SalonSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all_cities")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [maxDistance, setMaxDistance] = useState<number>(0) // 0 means no distance filter
  const [sortBy, setSortBy] = useState<"relevance" | "distance" | "rating">("relevance")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.")
      return
    }

    setIsLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLocationPermission("granted")
        setSortBy("distance") // Auto-sort by distance when location is obtained
        setIsLoadingLocation(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        setLocationPermission("denied")
        setIsLoadingLocation(false)

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access denied. You can still search by city.")
            break
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break
          case error.TIMEOUT:
            alert("Location request timed out.")
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  const filteredAndSortedSalons = useMemo(() => {
    const filtered = salons.filter((salon) => {
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

      // Distance filter
      if (maxDistance > 0 && userLocation && salon.latitude && salon.longitude) {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          salon.latitude,
          salon.longitude,
        )
        if (distance > maxDistance) {
          return false
        }
      }

      return true
    })

    // Add distance information to salons
    const salonsWithDistance = filtered.map((salon) => ({
      ...salon,
      distance:
        userLocation && salon.latitude && salon.longitude
          ? calculateDistance(userLocation.latitude, userLocation.longitude, salon.latitude, salon.longitude)
          : null,
    }))

    // Sort salons
    switch (sortBy) {
      case "distance":
        return salonsWithDistance.sort((a, b) => {
          if (a.distance === null && b.distance === null) return 0
          if (a.distance === null) return 1
          if (b.distance === null) return -1
          return a.distance - b.distance
        })
      case "rating":
        return salonsWithDistance.sort((a, b) => b.rating - a.rating)
      default:
        return salonsWithDistance
    }
  }, [salons, searchQuery, selectedCity, selectedCategories, minRating, maxDistance, userLocation, sortBy])

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

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={requestLocation}
                disabled={isLoadingLocation}
                className="lg:w-auto bg-transparent"
              >
                {isLoadingLocation ? (
                  <Target className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4 mr-2" />
                )}
                {isLoadingLocation ? "Getting Location..." : "Near Me"}
              </Button>

              <Select value={sortBy} onValueChange={(value: "relevance" | "distance" | "rating") => setSortBy(value)}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="distance" disabled={!userLocation}>
                    Distance
                  </SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Location Status */}
          {userLocation && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Location detected - showing salons near you</span>
              </div>
            </div>
          )}

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Minimum Rating</h3>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                    <SelectTrigger>
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

                <div>
                  <h3 className="font-medium mb-3">Maximum Distance</h3>
                  <Select
                    value={maxDistance.toString()}
                    onValueChange={(value) => setMaxDistance(Number(value))}
                    disabled={!userLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={userLocation ? "Any Distance" : "Enable location first"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Distance</SelectItem>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="20">Within 20 km</SelectItem>
                      <SelectItem value="50">Within 50 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredAndSortedSalons.length} Salon{filteredAndSortedSalons.length !== 1 ? "s" : ""} Found
        </h2>
        {userLocation && sortBy === "distance" && (
          <Badge variant="outline" className="text-sm">
            <Navigation className="h-3 w-3 mr-1" />
            Sorted by distance
          </Badge>
        )}
      </div>

      {/* Salon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedSalons.map((salon) => {
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
                {salon.distance !== null && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-900">
                      <MapPin className="h-3 w-3 mr-1" />
                      {salon.distance < 1 ? `${Math.round(salon.distance * 1000)}m` : `${salon.distance.toFixed(1)}km`}
                    </Badge>
                  </div>
                )}
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

      {filteredAndSortedSalons.length === 0 && (
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
                setMaxDistance(0)
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
