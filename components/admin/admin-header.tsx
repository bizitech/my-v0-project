import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Settings, LogOut } from "lucide-react"
import { signOut } from "@/lib/actions"

export function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-2xl font-bold text-primary">
              Bella Beauty Admin
            </Link>
            <Badge variant="secondary">Admin Panel</Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              View Site
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          <form action={signOut}>
            <Button variant="outline" type="submit" className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
