import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check Supabase environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET

    // Check database environment variables
    const postgresUrl = process.env.POSTGRES_URL
    const postgresPrismaUrl = process.env.POSTGRES_PRISMA_URL
    const postgresHost = process.env.POSTGRES_HOST
    const postgresUser = process.env.POSTGRES_USER
    const postgresPassword = process.env.POSTGRES_PASSWORD
    const postgresDatabase = process.env.POSTGRES_DATABASE

    const envStatus = {
      supabase: {
        url: supabaseUrl ? "✅ Available" : "❌ Missing",
        anonKey: supabaseAnonKey ? "✅ Available" : "❌ Missing",
        serviceKey: supabaseServiceKey ? "✅ Available" : "❌ Missing",
        jwtSecret: supabaseJwtSecret ? "✅ Available" : "❌ Missing",
      },
      postgres: {
        url: postgresUrl ? "✅ Available" : "❌ Missing",
        prismaUrl: postgresPrismaUrl ? "✅ Available" : "❌ Missing",
        host: postgresHost ? "✅ Available" : "❌ Missing",
        user: postgresUser ? "✅ Available" : "❌ Missing",
        password: postgresPassword ? "✅ Available" : "❌ Missing",
        database: postgresDatabase ? "✅ Available" : "❌ Missing",
      },
      summary: {
        supabaseConfigured: !!(supabaseUrl && supabaseAnonKey),
        postgresConfigured: !!(postgresUrl && postgresHost),
        allEnvironmentVariables: Object.keys(process.env).length,
      },
    }

    return NextResponse.json(envStatus, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to check environment variables", details: error }, { status: 500 })
  }
}
