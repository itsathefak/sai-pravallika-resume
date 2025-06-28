"use client"

import { motion } from "framer-motion"
import { Heart, Linkedin, Mail, FileText } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative py-16 bg-gradient-to-t from-purple-900/20 to-transparent">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Main content */}
          <div className="mb-12">
            <motion.h3 className="text-3xl font-bold mb-4 gradient-text" whileHover={{ scale: 1.05 }}>
              Let's Build a Sustainable Future Together
            </motion.h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Investing energy in joyful sustainability through innovative architecture and regenerative design.
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-8 mb-12">
            <motion.a
              href="https://www.linkedin.com/in/sai-pravallika-allu/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-500 to-indigo-500 p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:allusaipravallika2010@gmail.com"
              className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <Mail size={24} />
            </motion.a>
            <motion.a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Portfolio PDF"
            >
              <FileText size={24} />
            </motion.a>
          </div>

          {/* Name with decorative lines */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent to-purple-400 mr-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <h2 className="text-2xl font-bold gradient-text whitespace-nowrap">Sai Pravallika Allu</h2>
            <motion.div
              className="w-24 h-px bg-gradient-to-l from-transparent to-purple-400 ml-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Copyright and tagline */}
          <div className="border-t border-purple-400/20 pt-8">
            <motion.p className="text-slate-400 mb-2" whileHover={{ color: "#a78bfa" }}>
              © 2025 Sai Pravallika Allu. All rights reserved.
            </motion.p>
            <motion.p
              className="text-purple-300 italic flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart size={16} className="text-pink-400" fill="currentColor" /> for sustainable architecture
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
