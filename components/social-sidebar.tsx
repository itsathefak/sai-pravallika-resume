"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail, Github } from "lucide-react"

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-0 left-10 z-50 flex flex-col items-center"
    >
      <div className="flex flex-col items-center space-y-6 mb-6">
        <a
          href="https://linkedin.com/in/nora-wang-31aa201b4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-medium-brown hover:text-accent transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:norawrp@gmail.com"
          className="text-medium-brown hover:text-accent transition-colors duration-300"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-medium-brown hover:text-accent transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
      </div>
      <div className="w-px h-24 bg-medium-brown/50"></div>
    </motion.div>
  )
}
