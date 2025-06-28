"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    images: string[];
    description: string[];
  };
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullView, setIsFullView] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with highest z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Modal - properly positioned to avoid all overlaps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-4 left-4 right-4 bottom-4 md:top-8 md:left-24 md:right-24 md:bottom-8 bg-surface rounded-2xl z-[210] overflow-hidden shadow-2xl border border-purple-400/30"
            style={{
              maxWidth: "calc(100vw - 200px)",
              maxHeight: "calc(100vh - 64px)",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 border border-purple-400/30 hover:border-purple-400/50"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  {/* Image Carousel */}
                  <div className="relative">
                    <div className="aspect-video bg-white/5 rounded-xl overflow-hidden relative border border-purple-400/20">
                      <img
                        src={
                          project.images[currentImageIndex] ||
                          "/placeholder.svg"
                        }
                        alt={`${project.title} - Image ${
                          currentImageIndex + 1
                        }`}
                        className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300"
                        onClick={() => setIsFullView(true)}
                      />

                      {/* Navigation buttons */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 border border-purple-400/30"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 border border-purple-400/30"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Image indicators */}
                    {project.images.length > 1 && (
                      <div className="flex justify-center mt-4 space-x-2">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentImageIndex
                                ? "bg-purple-400"
                                : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">
                      Project Details
                    </h3>
                    <div className="space-y-3 text-slate-300">
                      {project.description.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <span className="text-purple-400 mt-2 flex-shrink-0">
                            •
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
      {isFullView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setIsFullView(false)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullView(false);
            }}
          >
            <X size={28} className="text-white" />
          </button>

          <img
            src={project.images[currentImageIndex] || "/placeholder.svg"}
            alt="Full View"
            className="max-w-full max-h-full object-contain cursor-zoom-out"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
