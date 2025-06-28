"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Code, Cpu, Mail, X } from "lucide-react"
import useSound from "use-sound"

const navItems = [
  { name: "Home", href: "#home", icon: <Home size={20} /> },
  { name: "About", href: "#about", icon: <User size={20} /> },
  { name: "Experience", href: "#experience", icon: <Briefcase size={20} /> },
  { name: "Projects", href: "#projects", icon: <Code size={20} /> },
  { name: "Skills", href: "#skills", icon: <Cpu size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 })

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 200

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    playClick()
    setIsOpen(false)

    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      {/* Mobile Nav Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-xl md:hidden"
        onClick={() => {
          playClick()
          setIsOpen(!isOpen)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle navigation"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="butterfly"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ButterflyIcon className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 z-50 glass rounded-2xl p-6 md:hidden shadow-2xl"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.href.substring(1)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-purple-300 hover:bg-white/10 hover:text-white"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function ButterflyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12,2C11.5,2 11,2.19 10.59,2.59L7.17,6L9,7.83L10.59,6.24C11,5.83 11,5.17 10.59,4.76L12,3.35L13.41,4.76C13,5.17 13,5.83 13.41,6.24L15,7.83L16.83,6L13.41,2.59C13,2.19 12.5,2 12,2M6.5,7.5C4,7.5 2,9.5 2,12S4,16.5 6.5,16.5C9,16.5 11,14.5 11,12S9,7.5 6.5,7.5M17.5,7.5C15,7.5 13,9.5 13,12S15,16.5 17.5,16.5C20,16.5 22,14.5 22,12S20,7.5 17.5,7.5Z" />
    </svg>
  )
}
