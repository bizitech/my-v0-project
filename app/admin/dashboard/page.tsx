import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Header } from "@/components/header"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header showBackButton />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your BeautyBook marketplace</p>
          </div>
          <AdminDashboard />
        </div>
      </main>
    </div>
  )
}
