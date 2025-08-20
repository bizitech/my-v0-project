"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useState } from "react"

const categories = [
  { value: "facial", label: "Facial Treatments" },
  { value: "hair", label: "Hair Services" },
  { value: "makeup", label: "Makeup" },
  { value: "nails", label: "Nail Care" },
  { value: "massage", label: "Body Treatments" },
  { value: "waxing", label: "Waxing" },
]

export function ServiceFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  const currentCategory = searchParams.get("category")
  const currentSearch = searchParams.get("search")

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/services?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters("search", searchTerm || null)
  }

  const clearFilters = () => {
    setSearchTerm("")
    router.push("/services")
  }

  return (
    <div className="mb-8 space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Category filters */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!currentCategory ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters("category", null)}
          >
            All Services
          </Button>
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={currentCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters("category", category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active filters */}
      {(currentCategory || currentSearch) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {currentCategory && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.value === currentCategory)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("category", null)} />
            </Badge>
          )}
          {currentSearch && (
            <Badge variant="secondary" className="gap-1">
              Search: {currentSearch}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters("search", null)} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
