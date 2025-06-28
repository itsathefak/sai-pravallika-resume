"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingElement {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  duration: number
  type: "leaf" | "butterfly" | "star"
}

export default function NatureBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = []
      const types: ("leaf" | "butterfly" | "star")[] = ["leaf", "butterfly", "star"]

      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          duration: 15 + Math.random() * 10,
          type: types[Math.floor(Math.random() * types.length)],
        })
      }

      setElements(newElements)
    }

    createElements()

    const handleResize = () => {
      createElements()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const LeafIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22.45C8.66,16.06 11.26,10.26 17,8.29C17,8.19 17,8.1 17,8Z" />
    </svg>
  )

  const ButterflyIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12,2C11.5,2 11,2.19 10.59,2.59L7.17,6L9,7.83L10.59,6.24C11,5.83 11,5.17 10.59,4.76L12,3.35L13.41,4.76C13,5.17 13,5.83 13.41,6.24L15,7.83L16.83,6L13.41,2.59C13,2.19 12.5,2 12,2M6.5,7.5C4,7.5 2,9.5 2,12S4,16.5 6.5,16.5C9,16.5 11,14.5 11,12S9,7.5 6.5,7.5M17.5,7.5C15,7.5 13,9.5 13,12S15,16.5 17.5,16.5C20,16.5 22,14.5 22,12S20,7.5 17.5,7.5Z" />
    </svg>
  )

  const StarIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </svg>
  )

  const getIcon = (type: string) => {
    switch (type) {
      case "leaf":
        return <LeafIcon className="w-8 h-8 text-emerald-400/30" />
      case "butterfly":
        return <ButterflyIcon className="w-10 h-10 text-purple-400/30" />
      case "star":
        return <StarIcon className="w-6 h-6 text-yellow-400/40" />
      default:
        return <LeafIcon className="w-8 h-8 text-emerald-400/30" />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: element.x,
            y: element.y,
            rotate: element.rotation,
            scale: element.scale,
            opacity: 0,
          }}
          animate={{
            x: [element.x, element.x + 100, element.x - 100, element.x + 50, element.x],
            y: [element.y, element.y - 80, element.y + 80, element.y - 40, element.y],
            rotate: [
              element.rotation,
              element.rotation + 180,
              element.rotation - 180,
              element.rotation + 90,
              element.rotation,
            ],
            opacity: [0, 0.6, 0.6, 0.6, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          {getIcon(element.type)}
        </motion.div>
      ))}

      {/* Aurora effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    </div>
  )
}
