import { NextResponse } from "next/server"
import { emailStatus } from "@/lib/email"

export async function GET() {
  return NextResponse.json(emailStatus())
}
