import { SignupForm } from "@/components/auth/signup-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join BeautyBook to book amazing beauty services</p>
            </div>

            <SignupForm />

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <Link href="/auth/beautician/signup" className="text-secondary hover:underline font-medium">
                Are you a beautician? Join here
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
