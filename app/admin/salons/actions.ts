"use server"
import { revalidatePath, revalidateTag } from "next/cache"
import { getAdminSupabase } from "@/lib/supabase/admin"
import { getServerSupabase } from "@/lib/supabase/server"
import { trySendEmail } from "@/lib/email"

function isAdminEmail(email?: string | null) {
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  return !!email && list.includes(email.toLowerCase())
}

async function requireAdmin() {
  const supa = await getServerSupabase()
  const {
    data: { user },
  } = await supa.auth.getUser()
  if (!isAdminEmail(user?.email)) {
    throw new Error("Forbidden: Admin access required")
  }
}

export async function approveSalon(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") || "")

  const admin = getAdminSupabase()
  const { data, error } = await admin
    .from("salons")
    .update({ status: "approved" })
    .eq("id", id)
    .select("name,email")
    .single()

  if (error) throw new Error(error.message)

  await trySendEmail({
    to: data?.email,
    subject: "Your salon is approved",
    text: `Great news — ${data?.name} is now live on our platform.`,
  }).catch(() => {})

  revalidateTag("salons")
  revalidatePath("/", "page")
  revalidatePath("/search")

  return { ok: true }
}

export async function rejectSalon(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") || "")

  const admin = getAdminSupabase()
  const { data, error } = await admin
    .from("salons")
    .update({ status: "rejected" })
    .eq("id", id)
    .select("email,name")
    .single()

  if (error) throw new Error(error.message)

  await trySendEmail({
    to: data?.email,
    subject: "Your salon registration update",
    text: `Thank you for your interest. ${data?.name} was not approved at this time.`,
  }).catch(() => {})

  revalidateTag("salons")
  revalidatePath("/", "page")
  revalidatePath("/search")

  return { ok: true }
}
