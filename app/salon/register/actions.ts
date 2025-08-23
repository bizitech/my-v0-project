"use server"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createSalonAction(formData: FormData) {
  try {
    const salonName = String(formData.get("salonName") || "").trim()
    const ownerName = String(formData.get("ownerName") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const phone = String(formData.get("phone") || "").trim()
    const address = String(formData.get("address") || "").trim()
    const city = String(formData.get("city") || "").trim()
    const area = String(formData.get("area") || "").trim()

    if (!salonName) return { error: "Salon name is required" }
    if (!ownerName) return { error: "Owner name is required" }
    if (!email) return { error: "Email is required" }
    if (!phone) return { error: "Phone is required" }
    if (!address) return { error: "Address is required" }
    if (!city) return { error: "City is required" }
    if (!area) return { error: "Area is required" }

    // TODO: Create user account and salon record in Supabase
    const supabase = createClient()

    // For now, just redirect to success page
    // In production, you would save to database here
    console.log("[v0] Creating salon:", { salonName, ownerName, email })

    redirect("/salon/register/confirm")
  } catch (error) {
    console.error("[v0] Error creating salon:", error)
    return { error: "Failed to create salon" }
  }
}
