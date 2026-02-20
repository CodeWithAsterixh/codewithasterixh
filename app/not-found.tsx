import Link from "next/link"
import { Button } from "@/components/ui/atoms/Button/Button"
import { Text } from "@/components/ui/atoms/Text/Text"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Text variant="h1" className="text-8xl font-bold mb-4 text-white/10">404</Text>
      <Text variant="h2" className="text-3xl font-medium mb-4">Page Not Found</Text>
      <Text variant="body" className="text-white/60 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Text>
      <Button
        variant="primary"
        href="/"
        icon={ArrowLeft}
      >
        Back to Home
      </Button>
    </div>
  )
}
