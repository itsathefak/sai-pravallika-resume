"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Clock } from "lucide-react";
import useSound from "use-sound";
import { useEffect, useState } from "react";

export default function Hero() {
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const saskatoonTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Regina",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setCurrentTime(saskatoonTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Time display - with highest z-index */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 left-6 z-[120] glass rounded-full px-4 py-2 flex items-center gap-2"
      >
        <Clock size={16} className="text-purple-400" />
        <span className="text-sm text-white/80">Saskatoon, CA</span>
        <span className="text-sm text-purple-300 font-mono">{currentTime}</span>
      </motion.div>

      <div className="section-container">
        <div className="flex flex-col items-center md:items-start">
          {/* Mobile-first layout - Bitmoji appears first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0], // Slow up and down movement
            }}
            transition={{
              duration: 0.8,
              y: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.05 }}
            className="relative mb-8 md:hidden"
          >
            <div className="w-80 h-80 mx-auto overflow-visible relative">
              {/* Enhanced violet glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-violet-600/40 rounded-full blur-2xl scale-125 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-xl scale-110"></div>
              <img
                src="/images/bitmoji.png"
                alt="Sai Pravallika Bitmoji"
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]"
              />
            </div>

            {/* Star - keep as is */}
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="currentColor"
              >
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
              </svg>
            </motion.div>

            {/* Pretty Moon instead of green rotating thing */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center shadow-xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white"
                fill="currentColor"
              >
                <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
              </svg>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Hi, I'm{" "}
                <span className="gradient-text">
                  Sai <br className="hidden md:block" />
                  Pravallika
                </span>
              </h1>

              <h2 className="text-2xl md:text-3xl text-purple-300 mb-6 font-light">
                Architect & Sustainability Expert
              </h2>

              <motion.p
                className="text-emerald-400 text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0 italic font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                "Investing my energy in joyful sustainability."
              </motion.p>

              <p className="text-slate-300 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                Bridging architecture, environmental science, and GIS technology
                to create equitable, climate-adaptive urban environments with
                regenerative thinking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    playClick();
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      window.scrollTo({
                        top: contactSection.offsetTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-all duration-300 shadow-lg font-medium"
                >
                  Get in Touch
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    borderColor: "#A78BFA",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-purple-400 text-purple-300 rounded-full transition-all duration-300 shadow-lg font-medium hover:text-white"
                >
                  Resume
                </motion.a>
              </div>
            </motion.div>

            {/* Desktop bitmoji - hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0], // Slow up and down movement
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                y: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="relative hidden md:block"
            >
              <div className="w-[22rem] h-[22rem] mx-auto overflow-visible relative">
                {/* Enhanced violet glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-violet-600/40 rounded-full blur-2xl scale-125 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-xl scale-110"></div>
                <img
                  src="/images/bitmoji.png"
                  alt="Sai Pravallika Bitmoji"
                  className="w-[22rem] h-[22rem] object-contain drop-shadow-[0_0_50px_rgba(168,85,247,1)]"
                />
              </div>

              {/* Star - keep as is */}
              <motion.div
                className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                >
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
              </motion.div>

              {/* Pretty Moon */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center shadow-xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                >
                  <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-purple-300 hover:text-purple-400 transition-colors duration-300"
      >
        <ArrowDown size={28} />
      </motion.a>
    </section>
  );
}
