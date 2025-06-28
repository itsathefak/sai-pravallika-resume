"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface PawPrint {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  duration: number
}

export default function CatPawsBackground() {
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([])

  useEffect(() => {
    // Create exactly 6 paw prints with fixed positions
    const fixedPaws: PawPrint[] = [
      {
        id: 1,
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.2,
        rotation: 15,
        scale: 0.7,
        duration: 40,
      },
      {
        id: 2,
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.15,
        rotation: -20,
        scale: 0.6,
        duration: 45,
      },
      {
        id: 3,
        x: window.innerWidth * 0.3,
        y: window.innerHeight * 0.6,
        rotation: 30,
        scale: 0.8,
        duration: 50,
      },
      {
        id: 4,
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.7,
        rotation: -15,
        scale: 0.65,
        duration: 55,
      },
      {
        id: 5,
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.4,
        rotation: 10,
        scale: 0.75,
        duration: 60,
      },
      {
        id: 6,
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.85,
        rotation: -25,
        scale: 0.7,
        duration: 65,
      },
    ]

    setPawPrints(fixedPaws)

    // Handle window resize
    const handleResize = () => {
      setPawPrints((prev) =>
        prev.map((paw, index) => ({
          ...paw,
          x: window.innerWidth * [0.15, 0.75, 0.3, 0.85, 0.5, 0.2][index % 6],
          y: window.innerHeight * [0.2, 0.15, 0.6, 0.7, 0.4, 0.85][index % 6],
        })),
      )
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pawPrints.map((paw) => (
        <motion.div
          key={paw.id}
          className="absolute"
          initial={{
            x: paw.x,
            y: paw.y,
            rotate: paw.rotation,
            scale: paw.scale,
            opacity: 0,
          }}
          animate={{
            x: [paw.x, paw.x + 50, paw.x - 50, paw.x + 30, paw.x],
            y: [paw.y, paw.y - 40, paw.y + 40, paw.y - 20, paw.y],
            rotate: [paw.rotation, paw.rotation + 10, paw.rotation - 10, paw.rotation + 5, paw.rotation],
            opacity: [0, 0.07, 0.07, 0.07, 0],
          }}
          transition={{
            duration: paw.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <CatPaw className="w-16 h-16 text-accent/20" />
        </motion.div>
      ))}
    </div>
  )
}

function CatPaw({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
    </svg>
  )
}
