import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Home, Clock } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Premium Beauty Services
                <span className="text-primary block">At Your Doorstep</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience luxury beauty treatments from certified professionals. Available both at our salon and as
                home services across Pakistan.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-5 w-5 text-accent" />
                <span>Certified Professionals</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Home className="h-5 w-5 text-accent" />
                <span>Home Service Available</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-accent" />
                <span>Same Day Booking</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/booking">Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
              <img
                src="/pakistani-woman-facial.png"
                alt="Beauty treatment at Bella Beauty Parlor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
