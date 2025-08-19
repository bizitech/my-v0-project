import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedServices } from "@/components/featured-services"
import { BeauticianCards } from "@/components/beautician-cards"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedServices />
        <BeauticianCards />
      </main>
      <Footer />
    </div>
  )
}
