"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/atoms/Button/Button"
import { Text } from "@/components/ui/atoms/Text/Text"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <Text variant="h1" className="text-4xl font-bold mb-4">Something went wrong!</Text>
      <Text variant="body" className="text-white/60 mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </Text>
      <Button
        variant="primary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
