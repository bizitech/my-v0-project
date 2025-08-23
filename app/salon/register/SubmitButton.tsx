"use client"
import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50"
    >
      {pending ? "Creating…" : "Create My Salon"}
    </button>
  )
}
