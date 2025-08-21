"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import { BasicInfoStep } from "./registration-steps/basic-info-step"
import { LocationStep } from "./registration-steps/location-step"
import { ServicesStep } from "./registration-steps/services-step"
import { PricingStep } from "./registration-steps/pricing-step"
import { VerificationStep } from "./registration-steps/verification-step"
import { SuccessStep } from "./registration-steps/success-step"

export interface SalonService {
  id: string
  name: string
  category: string
  salonPrice: number
  homePrice: number
  duration: number
  description: string
}

export interface SalonRegistrationData {
  // Basic Info
  salonName: string
  ownerName: string
  email: string
  phone: string
  description: string
  password: string
  confirmPassword: string

  // Location
  address: string
  city: string
  area: string
  postalCode: string

  // Services & Amenities
  categories: string[]
  amenities: string[]
  openingHours: Record<string, { open: string; close: string; closed?: boolean }>

  services: SalonService[]

  // Verification
  cnic: string
  businessLicense?: string
  images: string[]
}

const steps = [
  { id: 1, title: "Basic Information", description: "Salon and owner details" },
  { id: 2, title: "Location", description: "Address and contact info" },
  { id: 3, title: "Services", description: "Categories and amenities" },
  { id: 4, title: "Pricing", description: "Service prices and rates" },
  { id: 5, title: "Verification", description: "Documents and images" },
  { id: 6, title: "Complete", description: "Registration submitted" },
]

export function SalonRegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<SalonRegistrationData>({
    salonName: "",
    ownerName: "",
    email: "",
    phone: "",
    description: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    categories: [],
    amenities: [],
    openingHours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "18:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "12:00", close: "17:00" },
    },
    services: [],
    cnic: "",
    businessLicense: "",
    images: [],
  })

  const updateData = (newData: Partial<SalonRegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-xl">
                Step {currentStep} of {steps.length}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1]?.title}</CardDescription>
            </div>
            <div className="text-sm text-gray-500">{Math.round(progress)}% Complete</div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      {/* Steps Navigation */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > step.id
                    ? "bg-green-500 border-green-500 text-white"
                    : currentStep === step.id
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="ml-3 min-w-0">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-gray-900" : "text-gray-400"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`ml-4 w-8 h-0.5 ${currentStep > step.id ? "bg-green-500" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && <BasicInfoStep data={registrationData} updateData={updateData} onNext={nextStep} />}
          {currentStep === 2 && (
            <LocationStep data={registrationData} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 3 && (
            <ServicesStep data={registrationData} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 4 && (
            <PricingStep data={registrationData} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 5 && (
            <VerificationStep data={registrationData} updateData={updateData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 6 && <SuccessStep data={registrationData} />}
        </CardContent>
      </Card>
    </div>
  )
}
