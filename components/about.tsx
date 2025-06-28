"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Briefcase, Heart, Camera, Palette, Mountain, Star, Moon, Zap, Globe } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="section-container relative bg-transparent">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 space-y-6 text-lg leading-relaxed"
          >
            {/* Bigger real photo above description */}
            <motion.div
              className="w-64 h-64 mx-auto md:mx-0 mb-8 rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/sai-real.jpg" alt="Sai Pravallika Allu" className="w-full h-full object-cover" />
            </motion.div>

            <p>
              I'm Sai Pravallika Allu, a passionate architect and sustainability expert with a unique blend of design
              creativity and environmental consciousness. Currently pursuing my Master's in Regenerative Sustainability
              at the University of Saskatchewan, I specialize in creating climate-adaptive urban environments that
              prioritize both ecological health and social equity.
            </p>
            <p>
              My work bridges the gap between architecture, environmental science, and cutting-edge GIS technology. With
              professional experience in sustainable residential design and a deep commitment to regenerative thinking,
              I approach every project with the goal of creating spaces that not only serve human needs but actively
              contribute to environmental restoration.
            </p>
            <p>
              From analyzing urban forest loss using satellite imagery to designing inclusive public spaces that
              celebrate biodiversity, my portfolio reflects a dedication to data-driven solutions and biophilic design
              principles. I believe in the power of architecture to heal both communities and ecosystems.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative z-10"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full text-white shadow-lg mr-4"
                >
                  <GraduationCap size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                <motion.div whileHover={{ x: 5 }} className="pl-4 border-l-2 border-purple-400/50">
                  <h4 className="text-purple-300 font-semibold">Master of Sustainability (Regenerative)</h4>
                  <p className="text-slate-400">University of Saskatchewan, Canada</p>
                  <p className="text-emerald-400 text-sm">2023 - 2025</p>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="pl-4 border-l-2 border-purple-400/50">
                  <h4 className="text-purple-300 font-semibold">Bachelor of Architecture</h4>
                  <p className="text-slate-400">Adhiyamaan College of Engineering, India</p>
                  <p className="text-emerald-400 text-sm">2017 - 2022</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative z-10"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-full text-white shadow-lg mr-4"
                >
                  <Briefcase size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Experience</h3>
              </div>
              <div className="space-y-4">
                <motion.div whileHover={{ x: 5 }} className="pl-4 border-l-2 border-emerald-400/50">
                  <h4 className="text-emerald-300 font-semibold">Architect</h4>
                  <p className="text-slate-400">Sustainable Residential Design, Tamil Nadu</p>
                  <p className="text-purple-400 text-sm">July 2022 - August 2023</p>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="pl-4 border-l-2 border-emerald-400/50">
                  <h4 className="text-emerald-300 font-semibold">Intern Architect</h4>
                  <p className="text-slate-400">Interior & Landscape Design</p>
                  <p className="text-purple-400 text-sm">June 2021 - October 2021</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative z-10"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-full text-white shadow-lg mr-4"
                >
                  <Heart size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Interests</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Mountain, label: "Nature", color: "text-emerald-400" },
                  { icon: Zap, label: "Northern Lights", color: "text-purple-400" },
                  { icon: Globe, label: "Sky", color: "text-blue-400" },
                  { icon: Star, label: "Space", color: "text-yellow-400" },
                  { icon: Moon, label: "Moon", color: "text-slate-300" },
                  { icon: Star, label: "Shooting Stars", color: "text-pink-400" },
                  { icon: Camera, label: "Photography", color: "text-indigo-400" },
                  { icon: Palette, label: "Design", color: "text-orange-400" },
                ].map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-white/5 p-3 rounded-full shadow-sm mb-2 hover:bg-white/10 transition-all duration-200">
                      <interest.icon size={20} className={interest.color} />
                    </div>
                    <span className="text-xs text-slate-300">{interest.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
