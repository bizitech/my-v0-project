export const dynamic = "force-dynamic"
export const revalidate = 0

import type React from "react"
import { SalonRegistrationFlow } from "@/components/salon/salon-registration-flow"
import { Header } from "@/components/header"

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export default function RegisterSalonPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div data-build={new Date().toISOString()} className="p-2 text-xs bg-yellow-100 text-center">
          /salon/register preview build - {new Date().toLocaleTimeString()}
        </div>

        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Register Your Salon</h1>
              <p className="text-gray-600">Complete the registration process to start accepting bookings</p>
            </div>

            <SalonRegistrationFlow />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
