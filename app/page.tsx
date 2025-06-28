"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Sidebar from "@/components/sidebar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import PuzzleGame from "@/components/puzzle-game"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import NatureBackground from "@/components/nature-background"
import MobileNav from "@/components/mobile-nav"
import SocialLinks from "@/components/social-links"
import ShootingStars from "@/components/shooting-stars"
import Head from "next/head"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    window.addEventListener("resize", checkMobile)

    // Preload sounds
    const clickSound = new Audio("/sounds/click.mp3")
    const successSound = new Audio("/sounds/success.mp3")
    clickSound.preload = "auto"
    successSound.preload = "auto"

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Head>
        <title>Sai Pravallika Allu | Sustainability & Architecture</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen bg-background text-white">
        {/* Enhanced Aurora effect */}
        <div className="fixed inset-0 z-0">
          <div className="aurora opacity-60"></div>
        </div>

        <NatureBackground />
        <ShootingStars />

        {/* Show sidebar only on desktop */}
        {!isMobile && <Sidebar />}

        {/* Show mobile navigation on mobile */}
        {isMobile && <MobileNav />}

        {/* Social links on bottom left */}
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
  )
}
