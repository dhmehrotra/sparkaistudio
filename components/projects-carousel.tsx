"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    logo: "/buyhome-logo-vH6kO.png",
    logoAlt: "BuyHome ABC to XYZ Logo",
    title: "BuyHome ABC to XYZ",
    description: "AI-guided home buying, reimagined.",
    link: "https://www.buyhomeabc.xyz",
    buttonText: "Visit Site",
    disabled: false,
  },
  {
    id: 2,
    logo: "/mindloop-logo-4ow2F.png",
    logoAlt: "MindLoop Pro Logo",
    title: "MindLoop Pro",
    description: "Multilingual AI therapy companion for immigrant mental health.",
    link: "https://mindloop.pro",
    buttonText: "Visit Site",
    disabled: false,
  },
  {
    id: 3,
    logo: "/retailmax-logo-GVKHu.png",
    logoAlt: "RetailMax Pro Logo",
    title: "RetailMax Pro",
    description: "Your AI growth copilot for Retail & CPG strategy.",
    link: "https://www.retailmax.pro",
    buttonText: "Visit Site",
    disabled: false,
  },
  {
    id: 4,
    logo: "/casapath-logo-lnFBD.png",
    logoAlt: "Casa Path Pro Logo",
    title: "Casa Path Pro",
    description: "AI-powered prep for a human-powered home search.",
    link: "https://casapath.pro",
    buttonText: "Visit Site",
    disabled: false,
  },
  {
    id: 5,
    emoji: "📺",
    title: "Fully AI-generated Digital Media Content",
    description: "AI-generated YouTube channels on diverse topics — coming soon.",
    link: "#",
    buttonText: "Coming Soon",
    disabled: true,
  },
]

// Double the projects array to create a seamless loop
const duplicatedProjects = [...projects, ...projects]

export default function ProjectsCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle mouse and touch events for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.clientX)
    setScrollX(scrollX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 1000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const x = e.clientX
    const walk = (startX - x) * 2 // Scroll speed multiplier
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollX + walk
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.touches[0].clientX)
    setScrollX(containerRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].clientX
    const walk = (startX - x) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollX + walk
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsPaused(false), 1000)
  }

  // Calculate the total width of all cards for the animation
  const calculateWidth = () => {
    if (!carouselRef.current) return 0
    const cardWidth = carouselRef.current.offsetWidth
    return cardWidth * projects.length
  }

  return (
    <section id="projects" className="min-h-screen bg-black py-20 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Our Projects
          </span>
        </h2>

        <div
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6 py-8"
            animate={
              isPaused
                ? { x: 0 }
                : {
                    x: [`0%`, `-${100 / (duplicatedProjects.length / projects.length)}%`],
                  }
            }
            transition={
              isPaused
                ? { duration: 0 }
                : {
                    duration: 20,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }
            }
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={() => setTimeout(() => setIsPaused(false), 1000)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="w-[320px] md:w-[350px] flex-shrink-0"
                ref={index === 0 ? carouselRef : null}
              >
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 overflow-hidden h-[400px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 flex flex-col">
                  <CardHeader className="pb-2 text-center">
                    <div className="flex justify-center items-center h-24 mb-4">
                      {project.logo ? (
                        <Image
                          src={project.logo || "/placeholder.svg"}
                          alt={project.logoAlt || project.title}
                          width={80}
                          height={80}
                          className="h-20 w-auto object-contain"
                        />
                      ) : (
                        <div className="text-5xl">{project.emoji}</div>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white text-center">{project.title}</h3>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-300 text-center">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <Button
                      disabled={project.disabled}
                      className={`${
                        project.disabled
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      } gap-2`}
                      onClick={() => {
                        if (!project.disabled) {
                          window.open(project.link, "_blank")
                        }
                      }}
                    >
                      {project.buttonText}
                      {!project.disabled && <ExternalLink className="h-4 w-4" />}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
