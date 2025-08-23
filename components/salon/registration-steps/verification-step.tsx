"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, ImageIcon } from "lucide-react"
import type { SalonRegistrationData } from "../salon-registration-flow"
import { useRef, useState } from "react"

interface VerificationStepProps {
  data: SalonRegistrationData
  updateData: (data: Partial<SalonRegistrationData>) => void
  onNext: () => void
  onPrev: () => void
}

export function VerificationStep({ data, updateData, onNext, onPrev }: VerificationStepProps) {
  const exteriorFileRef = useRef<HTMLInputElement>(null)
  const interiorFileRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (files: FileList | null, type: "exterior" | "interior") => {
    if (!files || files.length === 0) return

    const fileNames = Array.from(files).map((file) => file.name)
    const currentImages = data.images || []

    if (type === "exterior") {
      updateData({ images: [...currentImages, ...fileNames] })
    } else {
      updateData({ images: [...currentImages, ...fileNames] })
    }
  }

  const triggerFileUpload = (type: "exterior" | "interior") => {
    if (type === "exterior") {
      exteriorFileRef.current?.click()
    } else {
      interiorFileRef.current?.click()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate salon creation process
      console.log("[v0] Creating salon with data:", data)

      // In a real app, this would call the server action
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Advance to success step
      onNext()
    } catch (error) {
      console.error("[v0] Error creating salon:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = data.salonName && data.ownerName && data.email && data.phone

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
        <p className="text-gray-600">Add your business details and salon photos (optional)</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessLicense">Business License (Optional)</Label>
          <Input
            id="businessLicense"
            name="businessLicense"
            value={data.businessLicense || ""}
            onChange={(e) => updateData({ businessLicense: e.target.value })}
            placeholder="Business registration number"
          />
          <p className="text-sm text-gray-500">If you have a registered business</p>
        </div>

        <div className="space-y-4">
          <Label>Salon Images (Optional)</Label>
          <input
            ref={exteriorFileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files, "exterior")}
          />
          <input
            ref={interiorFileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files, "interior")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-dashed border-2 border-gray-300 hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Salon Exterior</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a photo of your salon from outside</p>
                <Button type="button" variant="outline" size="sm" onClick={() => triggerFileUpload("exterior")}>
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
                <Button type="button" variant="outline" size="sm" onClick={() => triggerFileUpload("interior")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </CardContent>
            </Card>
          </div>
          {data.images && data.images.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
              <div className="flex flex-wrap gap-2">
                {data.images.map((image, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {image}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500">
            High-quality photos help customers choose your salon. You can add more photos later from your dashboard.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h4 className="font-medium text-blue-900">What happens next?</h4>
              <p className="text-sm text-blue-700 mt-1">
                After submission, you can immediately start setting up your services and staff. Your salon will be live
                on the platform right away!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Creating Salon..." : "Create My Salon"}
          </Button>
        </div>
      </div>
    </form>
  )
}
