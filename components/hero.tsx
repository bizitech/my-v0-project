import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar } from "lucide-react"

export function Hero() {
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  All treatments and services
                </label>
                <Input placeholder="Search for treatments..." className="border-gray-200 focus:border-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current location
                </label>
                <Input placeholder="Enter your city..." className="border-gray-200 focus:border-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Any date
                </label>
                <Input type="date" className="border-gray-200 focus:border-primary" />
              </div>

              <Button size="lg" className="bg-black hover:bg-gray-800 text-white h-12">
                Search
              </Button>
            </div>
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
