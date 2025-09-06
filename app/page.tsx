"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Head from "next/head";

// Sections / components
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import PuzzleGame from "@/components/puzzle-game";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import NatureBackground from "@/components/nature-background";
import MobileNav from "@/components/mobile-nav";
import SocialLinks from "@/components/social-links";
import ShootingStars from "@/components/shooting-stars";

// Fixed, site-wide time overlay (Saskatoon time)
function TimeOverlay() {
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
    const id: number = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none fixed top-6 right-6 z-[9999]"
    >
      <div className="pointer-events-auto glass rounded-full px-4 py-2 flex items-center gap-2">
        <Clock size={16} className="text-purple-400" />
        <span className="text-sm text-white/80">Saskatoon, CA</span>
        <span className="text-sm text-purple-300 font-mono">{currentTime}</span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Preload sounds
    const clickSound = new Audio("/sounds/click.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    clickSound.preload = "auto";
    successSound.preload = "auto";

    // Simulated loading (if you enable the LoadingScreen)
    const timer = window.setTimeout(() => setLoading(false), 3000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // if (loading) {
  //   return <LoadingScreen />
  // }

  return (
    <>
      <Head>
        <title>Sai Pravallika Allu | Sustainability & Architecture</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-background text-white">
        {/* Global time overlay at top of everything */}
        <TimeOverlay />

        {/* Enhanced Aurora effect */}
        <div className="fixed inset-0 z-0">
          <div className="aurora opacity-60"></div>
        </div>

        <NatureBackground />
        <ShootingStars />

        {/* Sidebar on desktop */}
        {!isMobile && <Sidebar />}

        {/* Mobile nav on mobile */}
        {isMobile && <MobileNav />}

        {/* Social links (bottom-left) */}
        <SocialLinks />

        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <PuzzleGame />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
