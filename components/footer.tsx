import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Bella Beauty</h3>
            <p className="text-sm text-muted-foreground">
              Premium beauty services for the modern Pakistani woman. Experience luxury treatments at our salon or in
              your home.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/services" className="block text-muted-foreground hover:text-primary">
                Our Services
              </Link>
              <Link href="/booking" className="block text-muted-foreground hover:text-primary">
                Book Appointment
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <div className="space-y-2 text-sm">
              <Link href="/services?category=facial" className="block text-muted-foreground hover:text-primary">
                Facial Treatments
              </Link>
              <Link href="/services?category=hair" className="block text-muted-foreground hover:text-primary">
                Hair Services
              </Link>
              <Link href="/services?category=makeup" className="block text-muted-foreground hover:text-primary">
                Makeup
              </Link>
              <Link href="/services?category=nails" className="block text-muted-foreground hover:text-primary">
                Nail Care
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+92-300-BEAUTY1</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@bellabeauty.pk</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">Main Locations: Lahore, Karachi, Islamabad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Bella Beauty Parlor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
