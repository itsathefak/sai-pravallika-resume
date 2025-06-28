"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ShootingStar {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  delay: number
}

export default function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    const createShootingStars = () => {
      const newStars: ShootingStar[] = []

      // Create only 4 shooting stars
      for (let i = 0; i < 4; i++) {
        const startX = Math.random() * window.innerWidth
        const startY = Math.random() * window.innerHeight * 0.3 // Top third of screen
        const endX = Math.random() * window.innerWidth
        const endY = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.3 // Bottom two thirds

        newStars.push({
          id: i,
          startX,
          startY,
          endX,
          endY,
          delay: Math.random() * 10, // Random delay up to 10 seconds
        })
      }

      setStars(newStars)
    }

    createShootingStars()

    const handleResize = () => {
      createShootingStars()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-80"
          initial={{
            x: star.startX,
            y: star.startY,
            opacity: 0,
          }}
          animate={{
            x: star.endX,
            y: star.endY,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 15, // Wait 15 seconds before repeating
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
