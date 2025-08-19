import { BeauticianProfile } from "@/components/beautician-profile"
import { ServicesList } from "@/components/services-list"
import { AvailabilityCalendar } from "@/components/availability-calendar"
import { BookingForm } from "@/components/booking-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

// Mock data - in a real app, this would come from a database
const beauticians = {
  "1": {
    id: "1",
    name: "Ayesha Khan",
    businessName: "Glamour Studio",
    location: "DHA, Karachi",
    rating: 4.9,
    reviews: 127,
    image: "/professional-female-beautician.png",
    bio: "Professional makeup artist with 8+ years of experience specializing in bridal and party makeup. Certified in advanced makeup techniques and skincare treatments.",
    experience: "8+ years",
    specialties: ["Bridal Makeup", "Party Makeup", "Hair Styling", "Skincare"],
    isAtHome: true,
    isAtSalon: true,
    salonAddress: "Shop 15, DHA Phase 2, Karachi",
    responseTime: "Usually responds in 2 hours",
    languages: ["Urdu", "English"],
    services: [
      {
        id: 1,
        name: "Bridal Makeup Package",
        description: "Complete bridal makeover including makeup, hair styling, and draping",
        duration: "4-5 hours",
        price: 15000,
        category: "Bridal",
        isAtHome: true,
        isAtSalon: true,
      },
      {
        id: 2,
        name: "Party Makeup",
        description: "Glamorous makeup for parties and events",
        duration: "2-3 hours",
        price: 5000,
        category: "Party",
        isAtHome: true,
        isAtSalon: true,
      },
      {
        id: 3,
        name: "Hair Styling",
        description: "Professional hair styling for any occasion",
        duration: "1-2 hours",
        price: 3000,
        category: "Hair",
        isAtHome: false,
        isAtSalon: true,
      },
      {
        id: 4,
        name: "Facial Treatment",
        description: "Deep cleansing facial with skincare consultation",
        duration: "1.5 hours",
        price: 4000,
        category: "Skincare",
        isAtHome: false,
        isAtSalon: true,
      },
    ],
    gallery: ["/bridal-makeup-artist.png", "/glamorous-party-makeup.png", "/hair-stylist-cutting-hair.png"],
    reviews: [
      {
        id: 1,
        name: "Sarah Ahmed",
        rating: 5,
        comment: "Amazing bridal makeup! Ayesha made me look absolutely stunning on my wedding day.",
        date: "2024-01-15",
        service: "Bridal Makeup Package",
      },
      {
        id: 2,
        name: "Fatima Ali",
        rating: 5,
        comment: "Professional service and beautiful results. Highly recommended!",
        date: "2024-01-10",
        service: "Party Makeup",
      },
    ],
  },
}

interface BeauticianPageProps {
  params: {
    id: string
  }
}

export default function BeauticianPage({ params }: BeauticianPageProps) {
  const beautician = beauticians[params.id as keyof typeof beauticians]

  if (!beautician) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile and Services */}
            <div className="lg:col-span-2 space-y-8">
              <BeauticianProfile beautician={beautician} />
              <ServicesList services={beautician.services} />
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              <AvailabilityCalendar />
              <BookingForm beautician={beautician} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
