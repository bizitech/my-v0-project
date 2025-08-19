"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Book Beauty Services
            <span className="block text-primary">Anywhere in Pakistan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover and book trusted beauticians for salon visits or at-home services across Pakistan. From makeup to
            massages, find the perfect beauty professional near you.
          </p>

          {/* Service Type Tabs */}
          <Tabs defaultValue="both" className="w-full max-w-md mx-auto mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-card">
              <TabsTrigger value="both" className="text-sm">
                Both
              </TabsTrigger>
              <TabsTrigger value="home" className="text-sm">
                At Home
              </TabsTrigger>
              <TabsTrigger value="salon" className="text-sm">
                At Salon
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Bar */}
          <div className="bg-background rounded-lg shadow-lg p-4 md:p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for services or beauticians..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="City or area (e.g., Karachi, Lahore)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-secondary hover:bg-secondary/90">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Bridal Makeup", "Hair Styling", "Facial", "Massage", "Mehndi", "Threading"].map((term) => (
                <Button key={term} variant="outline" size="sm" className="text-xs bg-background hover:bg-muted">
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
