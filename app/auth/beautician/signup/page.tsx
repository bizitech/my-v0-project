import { BeauticianSignupForm } from "@/components/auth/beautician-signup-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function BeauticianSignupPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Join as a Beautician</h1>
              <p className="text-muted-foreground">
                Start your beauty business with BeautyBook and reach thousands of customers
              </p>
            </div>

            <BeauticianSignupForm />

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Already have a beautician account?{" "}
                <Link href="/auth/beautician/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <Link href="/auth/signup" className="text-secondary hover:underline font-medium">
                Looking for beauty services? Sign up as a customer
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
