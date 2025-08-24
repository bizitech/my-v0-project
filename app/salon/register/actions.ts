"use server"
import { redirect } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"
import { getServerSupabase } from "@/lib/supabase/server"
import { trySendEmail } from "@/lib/email"

export async function createSalonAction(formData: FormData) {
  try {
    const payload = {
      name: String(formData.get("salonName") || "").trim(),
      owner_name: String(formData.get("ownerName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      area: String(formData.get("area") || "").trim(),
    }

    if (!payload.name) return { error: "Salon name is required" }
    if (!payload.owner_name) return { error: "Owner name is required" }
    if (!payload.email) return { error: "Email is required" }
    if (!payload.phone) return { error: "Phone is required" }
    if (!payload.address) return { error: "Address is required" }
    if (!payload.city) return { error: "City is required" }
    if (!payload.area) return { error: "Area is required" }

    const supabase = await getServerSupabase()

    const { data, error } = await supabase
      .from("salons")
      .insert({
        name: payload.name,
        owner_name: payload.owner_name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
        area: payload.area,
        status: "pending", // Changed from approved to pending for admin review
      })
      .select("id")
      .single()

    if (error) {
      console.error("[v0] Error creating salon:", error)
      return { error: error.message }
    }

    console.log("[v0] Created salon with ID:", data.id)

    await trySendEmail({
      to: payload.email,
      subject: "We received your salon registration",
      text: `Thanks! ${payload.name} is under review and you'll hear back from us soon.`,
    }).catch(() => {})

    revalidateTag("salons")
    revalidatePath("/", "page")

    redirect("/salon/register/confirm")
  } catch (error) {
    console.error("[v0] Error creating salon:", error)
    return { error: "Failed to create salon" }
  }
}
