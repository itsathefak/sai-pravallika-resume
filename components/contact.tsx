"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, Linkedin, Send, MapPin, FileText } from "lucide-react"
import useSound from "use-sound"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 })

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", message: "" })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to send message")
      }
    } catch (error) {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="section-container relative bg-transparent">
      {/* Aurora background effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="section-title">Let's Connect</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={formVariants} transition={{ delay: 0.2 }}>
            <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              I'm always excited to discuss sustainable architecture, urban planning projects, or collaboration
              opportunities. Let's create something amazing together!
            </p>

            <div className="space-y-6">
              <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone size={24} />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Phone</h4>
                  <p className="text-purple-300">+1 (306) 880-0895</p>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-full text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={24} />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Email</h4>
                  <p className="text-emerald-300">allusaipravallika2010@gmail.com</p>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-gradient-to-br from-blue-500 to-indigo-500 p-4 rounded-full text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Linkedin size={24} />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/sai-pravallika-allu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-400 hover:underline transition-colors duration-200"
                  >
                    sai-pravallika-allu
                  </a>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-full text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileText size={24} />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Portfolio PDF</h4>
                  <a
                    href="/portfolio.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-300 hover:text-orange-400 hover:underline transition-colors duration-200"
                  >
                    Download Portfolio
                  </a>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                <motion.div
                  className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-full text-white shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin size={24} />
                </motion.div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Location</h4>
                  <p className="text-green-300">Saskatoon, Saskatchewan, Canada</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={formVariants} transition={{ delay: 0.4 }}>
            <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 relative z-10">
              {submitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-emerald-500/20 text-emerald-300 p-6 rounded-xl mb-6 border border-emerald-500/30">
                    <h3 className="text-xl font-bold mb-2">Thank you for reaching out!</h3>
                    <p>I'll get back to you as soon as possible.</p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-purple-400 hover:text-purple-300 hover:underline transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mb-6 border border-red-500/30">
                      {error}
                    </div>
                  )}

                  <div className="mb-6">
                    <label htmlFor="name" className="block text-purple-300 mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-purple-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-purple-300 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-purple-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-purple-300 mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-purple-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-slate-400 resize-none"
                      placeholder="Tell me about your project or how we can collaborate..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
