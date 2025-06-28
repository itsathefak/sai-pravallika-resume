"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[300]">
      {/* Same background elements as main page */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 50, 0],
              y: [0, -80, 80, -40, 0],
              rotate: [0, 180, -180, 90, 0],
              opacity: [0, 0.3, 0.3, 0.3, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            {i % 3 === 0 && <LeafIcon className="w-8 h-8 text-emerald-400/30" />}
            {i % 3 === 1 && <StarIcon className="w-6 h-6 text-yellow-400/40" />}
            {i % 3 === 2 && <MoonIcon className="w-10 h-10 text-purple-400/30" />}
          </motion.div>
        ))}
      </div>

      {/* Aurora effect */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
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

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-lg relative z-10"
      >
        {/* Full name with gradient - single line */}
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text whitespace-nowrap">
          Sai Pravallika Allu
        </h1>

        {/* Better looking star loader */}
        <div className="relative h-24 w-24 mx-auto mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Star outline with better proportions */}
            <path
              d="M50 15 L58 38 L82 38 L63 52 L71 75 L50 61 L29 75 L37 52 L18 38 L42 38 Z"
              fill="none"
              stroke="rgba(139, 92, 246, 0.4)"
              strokeWidth="1.5"
            />

            {/* Filled star based on progress with smooth gradient */}
            <path
              d="M50 15 L58 38 L82 38 L63 52 L71 75 L50 61 L29 75 L37 52 L18 38 L42 38 Z"
              fill="url(#starGradient)"
              style={{
                clipPath: `polygon(0 ${100 - progress}%, 100% ${100 - progress}%, 100% 100%, 0% 100%)`,
              }}
            />

            {/* Cute smiling face with better positioning */}
            <circle cx="44" cy="42" r="1.5" fill="rgba(255, 255, 255, 0.9)" />
            <circle cx="56" cy="42" r="1.5" fill="rgba(255, 255, 255, 0.9)" />
            <path
              d="M42 52 Q50 58, 58 52"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <motion.div
          className="w-64 h-1 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <p className="text-white/80 mt-4">Loading portfolio... {progress}%</p>
        <p className="text-white/60 text-sm mt-2">Investing energy in joyful sustainability</p>
      </motion.div>
    </div>
  )
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22.45C8.66,16.06 11.26,10.26 17,8.29C17,8.19 17,8.1 17,8Z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
    </svg>
  )
}
