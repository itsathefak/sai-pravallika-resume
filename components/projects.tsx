"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Satellite,
  Map,
  TreePine,
  Building,
  Leaf,
  ExternalLink,
} from "lucide-react";
import ProjectModal from "./project-modal";

const projects = [
  {
    title: "Remote Sensing – Urban Forests Analysis",
    location: "Langford, Vancouver Island",
    period: "2024",
    category: "Research Project",
    tech: [
      "Sentinel-2",
      "Google Earth Engine",
      "Random Forest",
      "NDVI",
      "EVI",
      "NDBI",
    ],
    icon: <Satellite size={24} />,
    color: "from-emerald-500 to-teal-500",
    description: [
      "Analyzed urban forest loss from 2019-2024 using advanced satellite imagery and machine learning classification models",
      "Implemented Random Forest classification algorithms in Google Earth Engine for accurate land use detection",
      "Utilized vegetation indices (NDVI, EVI) and built-up indices (NDBI) for comprehensive environmental assessment",
      "Aligned research outcomes with UN SDG 11 (Sustainable Cities) and SDG 15 (Life on Land) frameworks",
      "Generated accuracy matrices and validation reports for scientific publication standards",
    ],
    images: [
      "/images/projects/urban-forest-1.jpg",
      "/images/projects/urban-forest-2.jpg",
      "/images/projects/urban-forest-3.jpg",
    ],
    link: "#",
    featured: true,
  },
  {
    title: "GIS Mapping – Equitable Green Space Access",
    location: "Saskatoon, Saskatchewan",
    period: "2024",
    category: "Urban Planning",
    tech: ["ArcGIS Pro", "Transit Analysis", "Story Maps", "Spatial Analysis"],
    icon: <Map size={24} />,
    color: "from-purple-500 to-pink-500",
    description: [
      "Assessed public park accessibility via bus transit buffers using advanced GIS spatial analysis techniques",
      "Identified significant urban inequalities, particularly highlighting disparities on Saskatoon's west side",
      "Created interactive Story Map visualization for public engagement and policy recommendations",
      "Developed comprehensive accessibility metrics considering transit frequency and walking distances",
      "Provided actionable insights for municipal planning and equitable urban development strategies",
    ],
    images: [
      "/images/projects/gis-mapping-1.jpg",
      "/images/projects/gis-mapping-2.jpg",
      "/images/projects/gis-mapping-3.jpg",
      "/images/projects/gis-mapping-4.jpg",
    ],
    link: "https://storymaps.arcgis.com/stories/example",
    featured: true,
  },
  {
    title: "Plant Biodiversity Assessment",
    location: "Northeast Swale Conservation Area",
    period: "2023",
    category: "Field Research",
    tech: [
      "Biodiversity Indices",
      "Statistical Analysis",
      "Field Sampling",
      "Ecological Modeling",
    ],
    icon: <TreePine size={24} />,
    color: "from-green-500 to-emerald-500",
    description: [
      "Conducted comprehensive field study comparing ecological zones between public and protected areas",
      "Applied biodiversity indices and statistical methods to quantify species richness and ecosystem health",
      "Documented higher biodiversity and reduced invasive species presence in protected core areas",
      "Developed evidence-based recommendations for invasive species management and ecological restoration",
      "Contributed to conservation planning and habitat management strategies for regional biodiversity protection",
    ],
    images: [
      "/images/projects/biodiversity-1.jpg",
      "/images/projects/biodiversity-2.jpg",
      "/images/projects/biodiversity-3.jpg",
      "/images/projects/biodiversity-4.jpg",
    ],
    link: "#",
    featured: false,
  },
  {
    title: "Public Park Redesign",
    location: "Pollachi, Tamil Nadu",
    period: "2022",
    category: "Design Project",
    tech: [
      "Biophilic Design",
      "Vaastu Principles",
      "Sustainable Systems",
      "Community Planning",
    ],
    icon: <Building size={24} />,
    color: "from-blue-500 to-indigo-500",
    description: [
      "Designed comprehensive park revitalization featuring motion sensor lighting and rainwater harvesting systems",
      "Integrated native plant species selection for climate adaptation and reduced maintenance requirements",
      "Created inclusive community zones including gazebos, amphitheater, and sensory maze for diverse user groups",
      "Applied Vaastu principles and clock-based orientation for intuitive navigation and cultural sensitivity",
      "Prioritized thermal comfort through strategic shading and natural ventilation design strategies",
    ],
    images: [
      "/images/projects/park-design-1.jpg",
      "/images/projects/park-design-2.jpg",
      "/images/projects/park-design-3.jpg",
      "/images/projects/park-design-4.jpg",
    ],
    link: "#",
    featured: false,
  },
  {
    title: "Urban Centre of Excellence",
    location: "Hyderabad, India",
    period: "2022",
    category: "Thesis Project",
    tech: [
      "Sustainable Architecture",
      "IGBC Standards",
      "Passive Design",
      "Green Mobility",
    ],
    icon: <Building size={24} />,
    color: "from-orange-500 to-red-500",
    description: [
      "Designed sustainable campus promoting interdisciplinary urban problem-solving and innovation",
      "Implemented passive cooling strategies and energy-efficient systems targeting IGBC Platinum certification",
      "Integrated green mobility solutions including cycling infrastructure and electric vehicle charging",
      "Created flexible co-working spaces fostering collaboration between diverse professional disciplines",
      "Developed comprehensive sustainability framework addressing water, energy, and waste management",
    ],
    images: [
      "/images/projects/urban-centre-1.jpg",
      "/images/projects/urban-centre-2.jpg",
      "/images/projects/urban-centre-3.jpg",
      "/images/projects/urban-centre-4.jpg",
    ],
    link: "#",
    featured: true,
  },
  {
    title: "Lakefront Redevelopment",
    location: "Chandrakudi Lake, India",
    period: "2021",
    category: "Urban Design",
    tech: [
      "Flood Resilience",
      "Stormwater Management",
      "Community Design",
      "Ecological Planning",
    ],
    icon: <Leaf size={24} />,
    color: "from-cyan-500 to-blue-500",
    description: [
      "Transformed natural water body into inclusive public zone balancing ecological preservation and community access",
      "Designed flood resilience buffer systems for climate change adaptation and natural disaster mitigation",
      "Created pedestrian-friendly pathways with universal accessibility standards and wayfinding systems",
      "Integrated cultural gathering nodes celebrating local heritage and fostering community social interaction",
      "Implemented natural stormwater management systems reducing urban runoff and improving water quality",
    ],
    images: [
      "/images/projects/lakefront-1.jpg",
      "/images/projects/lakefront-2.jpg",
    ],
    link: "#",
    featured: false,
  },
  {
    title: "Volunteer Project – Invasive Species Impact",
    location: "Asquith Conservation Area, Saskatchewan",
    period: "2023",
    category: "Volunteer Project",
    tech: [
      "Field Survey",
      "Species Identification",
      "Ecological Monitoring",
      "Community Conservation",
    ],
    icon: <Leaf size={24} />,
    color: "from-lime-500 to-green-600",
    description: [
      "Volunteered in ecological assessment of invasive plant species in Asquith Conservation Area to support regional conservation goals.",
      "Collected and analyzed vegetation data across affected and control plots using standardized biodiversity survey methods.",
      "Documented spread of key invasive species and their impact on native flora and ecosystem balance.",
      "Contributed to local conservation strategy through data collection, field reporting, and public awareness support.",
      "Helped formulate recommendations for invasive species management and ecological restoration planning.",
    ],
    images: [
      "/images/projects/asquith-1.jpg",
      "/images/projects/asquith-2.jpg",
    ],
    link: "#",
    featured: false,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="section-container bg-transparent">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <h2 className="section-title">Projects & Research</h2>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer relative z-10 ${
                project.featured ? "md:col-span-2" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <div
                className={`bg-gradient-to-r ${project.color} p-6 text-white`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="bg-white/20 p-2 rounded-full"
                      >
                        {project.icon}
                      </motion.div>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/90 mb-1">{project.location}</p>
                    <p className="text-white/70 text-sm">{project.period}</p>
                  </div>
                  {project.link !== "#" && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-white/20 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {project.description.slice(0, 3).map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="text-slate-300 flex gap-3 leading-relaxed"
                    >
                      <span className="text-purple-400 mt-2 flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                  {project.description.length > 3 && (
                    <p className="text-purple-400 text-sm italic">
                      Click to view more details...
                    </p>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject || projects[0]}
      />
    </section>
  );
}
