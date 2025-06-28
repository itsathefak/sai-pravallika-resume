"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skills = [
  { name: "ArcGIS Pro", icon: "🗺️", category: "GIS & Mapping" },
  { name: "Google Earth Pro", icon: "🌍", category: "GIS & Mapping" },
  { name: "SketchUp", icon: "🏗️", category: "3D & Visualization" },
  { name: "Revit", icon: "🏢", category: "3D & Visualization" },
  { name: "Lumion", icon: "✨", category: "3D & Visualization" },
  { name: "AutoCAD", icon: "📐", category: "Drafting" },
  { name: "Photoshop", icon: "🎨", category: "Adobe Suite" },
  { name: "Microsoft Office", icon: "📊", category: "Productivity" },
  { name: "Remote Sensing", icon: "🛰️", category: "Analysis" },
  { name: "Statistical Analysis", icon: "📈", category: "Analysis" },
  { name: "Sustainable Design", icon: "🌱", category: "Design" },
  { name: "Urban Planning", icon: "🏙️", category: "Design" },
  { name: "Research", icon: "🔬", category: "Soft Skills" },
  { name: "Project Management", icon: "📋", category: "Soft Skills" },
  { name: "Team Leadership", icon: "👥", category: "Soft Skills" },
  { name: "Communication", icon: "💬", category: "Soft Skills" },
  { name: "Critical Thinking", icon: "🧠", category: "Soft Skills" },
  { name: "Problem Solving", icon: "🔧", category: "Soft Skills" },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="section-container bg-transparent">
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={containerVariants}>
        <h2 className="section-title">Skills & Expertise</h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center"
          variants={containerVariants}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -10,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 },
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center shadow-lg mb-3 group-hover:shadow-2xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300 border border-purple-400/20 group-hover:border-purple-400/50">
                <span className="text-3xl">{skill.icon}</span>
              </div>
              <span className="text-white text-sm text-center font-medium group-hover:text-purple-300 transition-colors duration-200">
                {skill.name}
              </span>
              <span className="text-slate-400 text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
