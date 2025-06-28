"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, FileText } from "lucide-react"

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-10 left-10 z-50 flex flex-col items-center space-y-4"
    >
      {/* Icons first */}
      <div className="flex flex-col items-center space-y-6">
        <motion.a
          href="https://www.linkedin.com/in/sai-pravallika-allu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 hover:text-purple-400 transition-colors duration-300"
          whileHover={{ scale: 1.2, y: -2 }}
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </motion.a>
        <motion.a
          href="mailto:allusaipravallika2010@gmail.com"
          className="text-purple-300 hover:text-purple-400 transition-colors duration-300"
          whileHover={{ scale: 1.2, y: -2 }}
          aria-label="Email"
        >
          <Mail size={20} />
        </motion.a>
        <motion.a
          href="/portfolio.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 hover:text-purple-400 transition-colors duration-300"
          whileHover={{ scale: 1.2, y: -2 }}
          aria-label="Portfolio PDF"
        >
          <FileText size={20} />
        </motion.a>
      </div>

      {/* Line below icons */}
      <div className="w-px h-24 bg-purple-400/50"></div>
    </motion.div>
  )
}
