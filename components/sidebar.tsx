"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Code, Cpu, Mail } from "lucide-react";
import useSound from "use-sound";

const navItems = [
  { name: "Home", href: "#home", icon: <Home size={20} /> },
  { name: "About", href: "#about", icon: <User size={20} /> },
  { name: "Experience", href: "#experience", icon: <Briefcase size={20} /> },
  { name: "Projects", href: "#projects", icon: <Code size={20} /> },
  { name: "Skills", href: "#skills", icon: <Cpu size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const y = window.scrollY + 200;
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.clientHeight;
        const id = el.getAttribute("id") || "";
        if (y >= top && y < top + height) setActiveSection(id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    playClick();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      // Left rail, vertically centered — NO scrollbars
      className="fixed inset-y-0 left-6 z-50 hidden md:flex items-center"
    >
      <div className="flex flex-col items-center gap-6">
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`relative group p-3 rounded-xl transition-all duration-300 ${
              activeSection === item.href.substring(1)
                ? "text-purple-400"
                : "text-purple-300/60 hover:text-purple-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={item.name}
          >
            {item.icon}
            {/* Tooltip opens inward (to the right) */}
            <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-surface text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
              {item.name}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
