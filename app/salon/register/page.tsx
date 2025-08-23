export const dynamic = "force-dynamic"
export const revalidate = 0

import type React from "react"

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export default function RegisterSalonPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div data-build={new Date().toISOString()} className="p-2 text-xs bg-yellow-100 mb-4 rounded">
          /salon/register preview build - {new Date().toLocaleTimeString()}
        </div>

        <h1 className="text-2xl font-bold mb-4">Register Salon</h1>
        <form className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
          <input type="text" placeholder="Salon Name" className="w-full border p-2 rounded" required />
          <input type="text" placeholder="Owner Name" className="w-full border p-2 rounded" required />
          <input type="email" placeholder="Email Address" className="w-full border p-2 rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </ErrorBoundary>
  )
}
