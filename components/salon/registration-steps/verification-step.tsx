"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, ImageIcon } from "lucide-react"
import type { SalonRegistrationData } from "../salon-registration-flow"
import { registerSalon } from "@/lib/actions"
import { useState } from "react"

interface VerificationStepProps {
  data: SalonRegistrationData
  updateData: (data: Partial<SalonRegistrationData>) => void
  onNext: () => void
  onPrev: () => void
}

export function VerificationStep({ data, updateData, onNext, onPrev }: VerificationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await registerSalon(data)
      onNext()
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = data.cnic && data.images.length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Documents</h2>
        <p className="text-gray-600">Help us verify your salon for customer trust</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cnic">CNIC Number *</Label>
          <Input
            id="cnic"
            value={data.cnic}
            onChange={(e) => updateData({ cnic: e.target.value })}
            placeholder="12345-1234567-1"
            required
          />
          <p className="text-sm text-gray-500">Your National Identity Card number</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessLicense">Business License (Optional)</Label>
          <Input
            id="businessLicense"
            value={data.businessLicense || ""}
            onChange={(e) => updateData({ businessLicense: e.target.value })}
            placeholder="Business registration number"
          />
          <p className="text-sm text-gray-500">If you have a registered business</p>
        </div>

        {/* Image Upload Placeholder */}
        <div className="space-y-4">
          <Label>Salon Images *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Salon Exterior</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a photo of your salon from outside</p>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Interior Photos</h3>
                <p className="text-sm text-gray-500 mb-4">Show your salon's interior and equipment</p>
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-gray-500">
            High-quality photos help customers choose your salon. You can add more photos later.
          </p>
        </div>

        {/* Temporary placeholder for images */}
        {data.images.length === 0 && (
          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => updateData({ images: ["/beauty-salon-exterior.png"] })}
            >
              Add Sample Images (Demo)
            </Button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium text-blue-900">What happens next?</h4>
            <p className="text-sm text-blue-700 mt-1">
              After submission, our team will review your application within 24-48 hours. You'll receive an email
              confirmation once approved.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit" disabled={!isValid || isSubmitting} className="px-8">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  )
}
