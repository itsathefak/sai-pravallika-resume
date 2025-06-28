"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, User, Briefcase, Code, Cpu, Mail } from "lucide-react"
import useSound from "use-sound"

const navItems = [
  { name: "Home", href: "#home", icon: <Home size={20} /> },
  { name: "About", href: "#about", icon: <User size={20} /> },
  { name: "Experience", href: "#experience", icon: <Briefcase size={20} /> },
  { name: "Projects", href: "#projects", icon: <Code size={20} /> },
  { name: "Skills", href: "#skills", icon: <Cpu size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
]

export default function Sidebar() {
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
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-10 right-10 z-50 hidden md:block"
    >
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`relative group p-3 rounded-xl transition-all duration-300 ${
              activeSection === item.href.substring(1)
                ? "text-purple-400" // Only change icon color when active
                : "text-purple-300/60 hover:text-purple-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={item.name}
          >
            {item.icon}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-surface text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
              {item.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
