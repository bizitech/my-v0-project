"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Mail, Settings } from "lucide-react"
import Link from "next/link"
import type { SalonRegistrationData } from "../salon-registration-flow"

interface SuccessStepProps {
  data: SalonRegistrationData
}

export function SuccessStep({ data }: SuccessStepProps) {
  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Submitted Successfully!</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thank you for registering <strong>{data.salonName}</strong> with our platform. Your application is now under
          review.
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Complete Salon Setup</p>
                <p className="text-sm text-gray-600">Add services, prices, and staff in your dashboard</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Go Live Instantly</p>
                <p className="text-sm text-gray-600">Start accepting bookings immediately after setup</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Email Confirmation</p>
                <p className="text-sm text-gray-600">Sent to {data.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-2xl mx-auto">
        <h4 className="font-medium text-purple-900 mb-2">Complete Your Setup:</h4>
        <ul className="text-sm text-purple-800 space-y-1 text-left">
          <li>• Add your services with prices (e.g., Haircut - Rs 1500)</li>
          <li>• Add staff members and their specialties</li>
          <li>• Set your business hours and availability</li>
          <li>• Upload salon photos to attract customers</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/salon-dashboard">Go to Salon Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
