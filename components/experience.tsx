"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Award, Users, Globe } from "lucide-react"

const experiences = [
  {
    title: "Architect",
    company: "EARTHRICKS - EARTH ARCHITECTURE AND SUSTAINABLE BUILDING TECHNIQUES",
    location: "Auroville, India",
    period: "July 2022 - August 2023",
    type: "Full-time",
    description: [
      "Designed sustainable building techniques for 9 projects, reducing construction costs by 20%",
      "Created 3D and CAD drawings, improving client approval rates by 30%",
      "Delivered 15+ client presentations with 100% project acceptance",
      "Enhanced energy efficiency by 25% using eco-friendly methods",
      "Reduced material transportation footprint by almost 15% through local sourcing",
    ],
    icon: <Briefcase size={24} />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Freelance Architect, Landscape & Urban Designer",
    company: "Independent Practice",
    location: "Various Locations",
    period: "July 2019 - October 2024",
    type: "Freelance",
    description: [
      "Completed over 60 projects in residential, landscape, and urban design",
      "Used sketching, site study, and user analysis to create people-focused, traditional, and eco-friendly designs",
      "Designed landscapes and buildings that work with the environment using low-impact materials",
      "Made 3D models and presentations with AutoCAD, Revit, SketchUp, Lumion, and Photoshop",
      "Delivered solutions that made clients happy 90% of the time",
    ],
    icon: <Users size={24} />,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Intern Architect",
    company: "THE COURTYARD",
    location: "Mysore, India",
    period: "June 2021 - October 2021",
    type: "Internship",
    description: [
      "Worked with the team on 18 projects using traditional designs and local materials",
      "Made conceptual sketches, 3D models, and CAD drawings",
      "Helped fix 30% of design problems before building started",
      "Communicated well with clients, keeping 90% of them happy",
      "Created presentations that helped get client approval faster",
    ],
    icon: <Users size={24} />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Sustainability Project Coordinator",
    company: "Student's Association, School of Environment and Sustainability",
    location: "University of Saskatchewan",
    period: "2024 - 2025",
    type: "Academic Role",
    description: [
      "Coordinated sustainability projects and initiatives within the academic community",
      "Led remote sensing and GIS course projects focusing on environmental analysis",
      "Collaborated on field projects with Meewasin for ecological research",
      "Developed project management skills in academic and research environments",
    ],
    icon: <Globe size={24} />,
    color: "from-green-500 to-emerald-500",
  },
]

const certifications = [
  {
    title: "Connecting for Climate Change Action Certificate",
    issuer: "Western University, Canada (Coursera)",
    icon: <Award size={20} />,
    color: "text-green-400",
  },
  {
    title: "Acoustic Ecology & Sonic Architecture",
    issuer: "NASA Convention, India",
    icon: <Award size={20} />,
    color: "text-yellow-400",
  },
  {
    title: "Basic Building Design",
    issuer: "CADD Center",
    icon: <Award size={20} />,
    color: "text-blue-400",
  },
  {
    title: "Photoshop Masterclass & Urban Mapping",
    issuer: "Online Certification",
    icon: <Award size={20} />,
    color: "text-purple-400",
  },
  {
    title: "Interior Design (Basic to Advanced)",
    issuer: "Professional Certification",
    icon: <Award size={20} />,
    color: "text-emerald-400",
  },
]

const volunteer = [
  {
    title: "Bird-Window Collision Project",
    role: "Research Volunteer",
    icon: <Globe size={20} />,
    color: "text-emerald-400",
  },
  {
    title: "Canadian Water Resource Association (CWRA)",
    role: "Conference Volunteer - CWRA 2024 National Conference",
    icon: <Globe size={20} />,
    color: "text-blue-400",
  },
  {
    title: "Youth Nature Keeper",
    role: "Canadian Council of Invasive Species - YNK 2024 Conference",
    icon: <Globe size={20} />,
    color: "text-purple-400",
  },
  {
    title: "Saskatoon Climate Hub",
    role: "Community Volunteer",
    icon: <Globe size={20} />,
    color: "text-pink-400",
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="experience" className="section-container bg-surface/50">
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={containerVariants}>
        <h2 className="section-title">Experience</h2>

        {/* Professional Experience */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-purple-300 mb-8 text-center">Professional Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 group relative z-10"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`bg-gradient-to-br ${exp.color} p-4 rounded-full text-white shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  >
                    {exp.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-purple-300 font-semibold">{exp.company}</p>
                        <p className="text-slate-400 text-sm">{exp.location}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium mb-1">
                          {exp.type}
                        </span>
                        <p className="text-slate-400 text-sm">{exp.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="text-slate-300 flex gap-3 leading-relaxed"
                        >
                          <span className="text-purple-400 mt-2">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications & Volunteer Work */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-purple-300 mb-6 text-center">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="glass rounded-xl p-4 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 flex items-center gap-4 relative z-10"
                >
                  <div className={`${cert.color}`}>{cert.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold">{cert.title}</h4>
                    <p className="text-slate-400 text-sm">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Volunteer Work */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-purple-300 mb-6 text-center">Volunteer & Associations</h3>
            <div className="space-y-4">
              {volunteer.map((vol, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="glass rounded-xl p-4 border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 flex items-center gap-4 relative z-10"
                >
                  <div className={`${vol.color}`}>{vol.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold">{vol.title}</h4>
                    <p className="text-slate-400 text-sm">{vol.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
