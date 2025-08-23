"use client"
import Link from "next/link"

export default function SalonRegisterConfirm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Salon Registered Successfully 🎉</h1>
      <p className="mb-6 text-gray-700">
        Your salon has been registered. You can now manage your bookings and details.
      </p>
      <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  )
}
