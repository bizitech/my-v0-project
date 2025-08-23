"use client"
import React from "react"

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error?: Error }> {
  state = { error: undefined as Error | undefined }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Register route error:", error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Register Route Error</h2>
          <p className="text-red-700 mb-4">{this.state.error.message}</p>
          <details className="text-sm text-red-600">
            <summary className="cursor-pointer">Stack trace</summary>
            <pre className="mt-2 whitespace-pre-wrap">{this.state.error.stack}</pre>
          </details>
          <button
            onClick={() => this.setState({ error: undefined })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
