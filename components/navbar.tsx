"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/SparkAIstudiologo2-0Og3dDnQwFwB2w018NubJkP7Z7wIly.png"
            alt="Spark AI Studios Logo"
            width={200}
            height={50}
            className="h-auto w-[180px] md:w-[200px]"
            priority
          />
        </div>
      </div>
    </header>
  )
}
