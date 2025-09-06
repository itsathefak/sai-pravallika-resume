"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Fixed time overlay (top-right)
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
      exit={{ opacity: 0, y: -12 }}
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
  const [showClock, setShowClock] = useState(true); // show only when Hero is visible

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

    // Simulated loading
    const timer = window.setTimeout(() => setLoading(false), 3000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Show the clock only while the #home (Hero) section is in view
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowClock(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05, // show when at least ~5% of hero is visible
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // if (loading) return <LoadingScreen />

  return (
    <>
      <Head>
        <title>Sai Pravallika Allu | Sustainability & Architecture</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-background text-white">
        {/* Clock appears only when Hero is intersecting */}
        <AnimatePresence>{showClock && <TimeOverlay />}</AnimatePresence>

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

        {/* Social links (bottom-right) */}
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
