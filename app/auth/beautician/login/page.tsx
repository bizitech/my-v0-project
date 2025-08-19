import { BeauticianLoginForm } from "@/components/auth/beautician-login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function BeauticianLoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Beautician Login</h1>
              <p className="text-muted-foreground">Access your beautician dashboard</p>
            </div>

            <BeauticianLoginForm />

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Don't have a beautician account?{" "}
                <Link href="/auth/beautician/signup" className="text-primary hover:underline font-medium">
                  Join as a beautician
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <Link href="/auth/login" className="text-secondary hover:underline font-medium">
                Customer login
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
