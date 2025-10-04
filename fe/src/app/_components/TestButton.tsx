"use client"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

interface TestButtonProps {
  endpoint: string
}

interface TestButtonProps {
  endpoint: string
  content: string
}

export default function TestButton({ endpoint, content }: TestButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(endpoint)
  }

  return (
    <div className="p-6">
      <Button
        variant="contained"
        className="bg-blue-500 hover:bg-blue-600"
        onClick={handleClick}
      >
        {content}
      </Button>
    </div>
  )
}