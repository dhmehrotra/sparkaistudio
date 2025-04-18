import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react" // Correct import statement
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spark AI Studios",
  description: "AI-powered experiments and projects",
  icons: {
    icon: "/SparkOnly-Gtk9VxRulcSEddm9k5nLexoW53RdQI.png",
    shortcut: "/SparkOnly-Gtk9VxRulcSEddm9k5nLexoW53RdQI.png",
    apple: "/SparkOnly-Gtk9VxRulcSEddm9k5nLexoW53RdQI.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          {children}
          <Analytics /> {/* Analytics component added here */}
        </Suspense>
      </body>
    </html>
  )
}
