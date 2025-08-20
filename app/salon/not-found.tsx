import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SalonNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Salon Not Found</h1>
          <p className="text-gray-600 mb-8">The salon you're looking for doesn't exist or may have been removed.</p>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/salons">Browse All Salons</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
