"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

/** Lock body scroll while the modal is open (no jump on close). */
function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    const y = window.scrollY;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyPosition = document.body.style.position;
    const bodyTop = document.body.style.top;
    const bodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.position = bodyPosition;
      document.body.style.top = bodyTop;
      document.body.style.width = bodyWidth;
      window.scrollTo(0, y);
    };
  }, [lock]);
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullView, setIsFullView] = useState(false);

  useLockBodyScroll(isOpen || isFullView);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  // Render nothing on the server (safety for Next.js)
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {(isOpen || isFullView) && (
        <>
          {/* Backdrop — above everything (higher than z-[9999] clock) */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10040]"
            onClick={() => (isFullView ? setIsFullView(false) : onClose())}
          />

          {/* Main modal */}
          {isOpen && (
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="
                fixed inset-0
                md:top-8 md:left-24 md:right-24 md:bottom-8
                bg-surface rounded-none md:rounded-2xl
                z-[10050] overflow-hidden shadow-2xl border border-purple-400/30
              "
              role="dialog"
              aria-modal="true"
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
                    aria-label="Close"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>

                {/* Content area scrolls; page behind stays locked */}
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

                        {project.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 border border-purple-400/30"
                              aria-label="Previous image"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 border border-purple-400/30"
                              aria-label="Next image"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                      </div>

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
                              aria-label={`Go to image ${index + 1}`}
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
          )}

          {/* Fullscreen image viewer (above modal) */}
          {isFullView && (
            <motion.div
              key="fullview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10060] bg-black/90 flex items-center justify-center"
              onClick={() => setIsFullView(false)}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullView(false);
                }}
                aria-label="Close fullscreen"
              >
                <X size={28} className="text-white" />
              </button>

              <img
                src={project.images[currentImageIndex] || "/placeholder.svg"}
                alt="Full view"
                className="max-w-full max-h-full object-contain cursor-zoom-out"
              />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
