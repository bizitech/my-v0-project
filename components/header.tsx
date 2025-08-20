import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut, Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/actions"

export async function Header() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get customer data if user is logged in
  let customer = null
  if (user) {
    const { data } = await supabase.from("customers").select("full_name").eq("id", user.id).single()
    customer = data
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-secondary transition-colors"
          >
            <Sparkles className="h-8 w-8" />
            <span>Bella Beauty</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {customer?.full_name || user.email?.split("@")[0] || "Account"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <form action={signOut} className="w-full">
                        <button type="submit" className="flex items-center gap-2 w-full text-left">
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/salon/register">Register Salon</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
