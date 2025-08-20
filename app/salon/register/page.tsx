import { SalonRegistrationFlow } from "@/components/salon/salon-registration-flow"

export default function SalonRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Register Your Beauty Salon</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Pakistan's leading beauty marketplace and connect with thousands of customers. Grow your business
              with our comprehensive booking and management platform.
            </p>
          </div>

          <SalonRegistrationFlow />
        </div>
      </div>
    </div>
  )
}
