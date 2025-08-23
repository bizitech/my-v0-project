"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar } from "lucide-react"

export function Hero() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  const handleSearchClick = () => {
    console.log("[v0] Search input clicked")
  }

  const handleSearchFocus = () => {
    console.log("[v0] Search input focused")
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[v0] Search input changed:", e.target.value)
    setSearchTerm(e.target.value)
  }

  const handleLocationClick = () => {
    console.log("[v0] Location input clicked")
  }

  const handleLocationFocus = () => {
    console.log("[v0] Location input focused")
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[v0] Location input changed:", e.target.value)
    setLocation(e.target.value)
  }

  const handleDateClick = () => {
    console.log("[v0] Date input clicked")
  }

  const handleDateFocus = () => {
    console.log("[v0] Date input focused")
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[v0] Date input changed:", e.target.value)
    setDate(e.target.value)
  }

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Book local beauty and
            <br />
            wellness services
          </h1>

          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mb-8">
            <form method="GET" action="/search" className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Service provider or services
                </label>
                <Input
                  type="text"
                  name="q"
                  placeholder="Search for treatments..."
                  className="border-2 border-gray-300 focus:border-blue-500 bg-white text-black"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={handleSearchClick}
                  onFocus={handleSearchFocus}
                  autoComplete="off"
                  spellCheck="false"
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current location
                </label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Enter your city..."
                  defaultValue="PESHAWAR"
                  className="border-2 border-gray-300 focus:border-blue-500 bg-white text-black"
                  value={location}
                  onChange={handleLocationChange}
                  onClick={handleLocationClick}
                  onFocus={handleLocationFocus}
                  autoComplete="off"
                  spellCheck="false"
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Any date
                </label>
                <Input
                  type="date"
                  name="date"
                  className="border-2 border-gray-300 focus:border-blue-500 bg-white text-black"
                  value={date}
                  onChange={handleDateChange}
                  onClick={handleDateClick}
                  onFocus={handleDateFocus}
                  autoComplete="off"
                  spellCheck="false"
                  style={{ pointerEvents: "auto", zIndex: 10 }}
                />
              </div>

              <Button type="submit" size="lg" className="bg-black hover:bg-gray-800 text-white h-12">
                Search
              </Button>
            </form>
          </div>

          <div className="text-center">
            <p className="text-lg font-medium mb-2">
              <span className="font-bold">164,188</span> appointments booked today
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
