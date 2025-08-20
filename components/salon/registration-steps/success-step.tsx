"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Mail, Phone } from "lucide-react"
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
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Review Process</p>
                <p className="text-sm text-gray-600">24-48 hours for application review</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Email Confirmation</p>
                <p className="text-sm text-gray-600">Sent to {data.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Phone Verification</p>
                <p className="text-sm text-gray-600">Call to {data.phone} if needed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
        <h4 className="font-medium text-yellow-900 mb-2">Important Notes:</h4>
        <ul className="text-sm text-yellow-800 space-y-1 text-left">
          <li>• Keep your phone accessible for verification calls</li>
          <li>• Check your email regularly for updates</li>
          <li>• Prepare additional documents if requested</li>
          <li>• You can update your salon information after approval</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
