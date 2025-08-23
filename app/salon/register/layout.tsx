import type React from "react"
import ErrorBoundary from "./error-boundary"

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
