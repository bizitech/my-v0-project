"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import type { SalonRegistrationData } from "@/components/salon/salon-registration-flow"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Check your email to confirm your account." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function createBooking(prevState: any, formData: FormData) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to create a booking" }
  }

  try {
    const salonId = formData.get("salonId") // Add salon ID to booking
    const serviceId = formData.get("serviceId")
    const staffId = formData.get("staffId")
    const bookingDate = formData.get("bookingDate")
    const bookingTime = formData.get("bookingTime")
    const isHomeService = formData.get("isHomeService") === "true"
    const customerAddress = formData.get("customerAddress")
    const notes = formData.get("notes")
    const totalAmount = Number.parseFloat(formData.get("totalAmount") as string)
    const paymentMethod = formData.get("paymentMethod") as string

    if (!salonId || !serviceId || !staffId || !bookingDate || !bookingTime || !totalAmount || !paymentMethod) {
      return { error: "Missing required booking information" }
    }

    // Create the booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        salon_id: salonId, // Include salon_id in booking
        customer_id: user.id,
        service_id: serviceId,
        staff_id: staffId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        is_home_service: isHomeService,
        customer_address: customerAddress || null,
        total_amount: totalAmount,
        notes: notes || null,
        status: "pending",
      })
      .select()
      .single()

    if (bookingError) {
      console.error("Booking creation error:", bookingError)
      return { error: "Failed to create booking. Please try again." }
    }

    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: booking.id,
      amount: totalAmount,
      payment_method: paymentMethod,
      status: paymentMethod === "cash_on_service" ? "pending" : "pending",
      transaction_id: paymentMethod === "cash_on_service" ? null : `TXN_${Date.now()}`,
    })

    if (paymentError) {
      console.error("Payment creation error:", paymentError)
      // Don't fail the booking if payment record creation fails
    }

    // Create customer record if it doesn't exist
    const { error: customerError } = await supabase.from("customers").upsert(
      {
        id: user.id,
        full_name: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
        address: customerAddress || "",
      },
      { onConflict: "id" },
    )

    if (customerError) {
      console.error("Customer creation error:", customerError)
    }

    revalidatePath("/booking")
    return { success: true, bookingId: booking.id }
  } catch (error) {
    console.error("Booking creation error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to update your profile" }
  }

  try {
    const fullName = formData.get("full_name")
    const phone = formData.get("phone")
    const address = formData.get("address")
    const city = formData.get("city")

    // Update customer record
    const { error: customerError } = await supabase.from("customers").upsert(
      {
        id: user.id,
        full_name: fullName?.toString() || "",
        phone: phone?.toString() || "",
        address: address?.toString() || "",
        city: city?.toString() || "",
      },
      { onConflict: "id" },
    )

    if (customerError) {
      console.error("Profile update error:", customerError)
      return { error: "Failed to update profile. Please try again." }
    }

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function changePassword(prevState: any, formData: FormData) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to change your password" }
  }

  try {
    const currentPassword = formData.get("current_password")
    const newPassword = formData.get("new_password")
    const confirmPassword = formData.get("confirm_password")

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: "All password fields are required" }
    }

    if (newPassword !== confirmPassword) {
      return { error: "New passwords do not match" }
    }

    if (newPassword.toString().length < 6) {
      return { error: "New password must be at least 6 characters long" }
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Password change error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function processPayment(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to process payment" }
  }

  try {
    const bookingId = formData.get("bookingId")
    const paymentMethod = formData.get("paymentMethod")
    const amount = Number.parseFloat(formData.get("amount") as string)

    if (!bookingId || !paymentMethod || !amount) {
      return { error: "Missing payment information" }
    }

    // Simulate payment processing based on method
    let paymentStatus = "pending"
    let transactionId = null

    switch (paymentMethod) {
      case "jazzcash":
      case "easypaisa":
        // In a real app, this would integrate with actual payment gateways
        paymentStatus = "completed"
        transactionId = `${paymentMethod.toUpperCase()}_${Date.now()}`
        break
      case "bank_transfer":
        paymentStatus = "pending"
        transactionId = `BANK_${Date.now()}`
        break
      case "cash_on_service":
        paymentStatus = "pending"
        break
      default:
        return { error: "Invalid payment method" }
    }

    // Update payment record
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        status: paymentStatus,
        transaction_id: transactionId,
        paid_at: paymentStatus === "completed" ? new Date().toISOString() : null,
      })
      .eq("booking_id", bookingId)

    if (paymentError) {
      console.error("Payment update error:", paymentError)
      return { error: "Failed to process payment. Please try again." }
    }

    // Update booking status if payment is completed
    if (paymentStatus === "completed") {
      await supabase.from("bookings").update({ status: "confirmed" }).eq("id", bookingId)
    }

    revalidatePath("/dashboard")
    return { success: true, paymentStatus, transactionId }
  } catch (error) {
    console.error("Payment processing error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function registerSalon(registrationData: SalonRegistrationData) {
  const supabase = createClient()

  try {
    // Create salon record
    const { data: salon, error: salonError } = await supabase
      .from("salons")
      .insert({
        name: registrationData.salonName,
        description: registrationData.description,
        owner_name: registrationData.ownerName,
        email: registrationData.email,
        phone: registrationData.phone,
        address: registrationData.address,
        city: registrationData.city,
        area: registrationData.area,
        postal_code: registrationData.postalCode,
        opening_hours: registrationData.openingHours,
        images: registrationData.images,
        is_verified: false,
        is_active: false, // Pending approval
        subscription_plan: "basic",
      })
      .select()
      .single()

    if (salonError) {
      console.error("Salon creation error:", salonError)
      throw new Error("Failed to register salon. Please try again.")
    }

    // Insert salon categories
    if (registrationData.categories.length > 0) {
      const categoryInserts = registrationData.categories.map((category) => ({
        salon_id: salon.id,
        category: category,
      }))

      const { error: categoryError } = await supabase.from("salon_categories").insert(categoryInserts)

      if (categoryError) {
        console.error("Category creation error:", categoryError)
      }
    }

    // Insert salon amenities
    if (registrationData.amenities.length > 0) {
      const amenityInserts = registrationData.amenities.map((amenity) => ({
        salon_id: salon.id,
        amenity: amenity,
      }))

      const { error: amenityError } = await supabase.from("salon_amenities").insert(amenityInserts)

      if (amenityError) {
        console.error("Amenity creation error:", amenityError)
      }
    }

    return { success: true, salonId: salon.id }
  } catch (error) {
    console.error("Salon registration error:", error)
    throw new Error("An unexpected error occurred during registration. Please try again.")
  }
}
