"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  openSpring,
  closeSpring,
  cardSpring,
  expandSpring,
} from "./animations";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  achievements: string[];
  image: string;
  backgroundImage: string;
  category: "Web" | "fullstack" | "enterprise" | "PHP" | "JavaScript";
  year: string;
  users?: string;
  impact?: string;
}

const projects: Project[] = [
  {
    id: "wizglobal",
    title: "Wizglobal Wealth Management System",
    description:
      "A secure, high-performing wealth management platform built with Laravel and JavaScript, handling fund administration, compliance, reporting, and end-of-day processes for leading insurers in East Africa.",
    tech: ["Laravel", "JavaScript", "Livewire", "MySQL", "PDF Generation"],
    achievements: [
      "Used by top insurance companies in East Africa",
      "Integrated fund dealing, compliance, and audit workflows",
      "Automated reporting and NAV calculations",
    ],
    image: "💼",
    backgroundImage: "📊",
    category: "enterprise",
    year: "2021-Date",
    users: "Hundreds of fund managers and insurance analysts",
    impact: "Improved efficiency and accuracy in fund management.",
  },
  {
    id: "medali",
    title: "Medali Digital / Wikimedia Projects",
    description:
      "Full-stack engineering for international fintech and enterprise clients, delivering scalable and maintainable systems.",
    tech: ["Laravel", "Vue.js", "Tailwind", "PostgreSQL"],
    achievements: [
      "Delivered enterprise-grade systems under strict timelines",
      "Contributed to high-impact open source tools",
    ],
    image: "🌐",
    backgroundImage: "🛠️",
    category: "fullstack",
    year: "2021-2023",
    users: "Thousands of users across multiple platforms",
    impact: "Enhanced digital presence for global clients.",
  },

  {
    id: "moovn",
    title: "Moovn Technologies",
    description:
      "Backend system for a ride-hailing and crowd-funding application used across East Africa. Built using Laravel with secure payment and tax modules.",
    tech: ["Laravel", "MySQL", "REST API"],
    achievements: [
      "Used in Tanzania, Kenya, and Uganda",
      "Integrated secure crowdfunding features",
      "Built scalable tax-compliant backend services",
    ],
    image: "🚕",
    backgroundImage: "💸",
    category: "PHP",
    year: "2021",
    users: "Thousands of commuters and funders",
    impact: "Increased access to local transport and funding tools",
  },
  {
    id: "drums",
    title: "Drums For Africa",
    description:
      "A real-time SMS platform managing over 100K users using Firebase and Node.js backend infrastructure.",
    tech: ["Node.js", "Firebase", "MongoDB", "Express"],
    achievements: [
      "Handled over 100K user records efficiently",
      "Enabled real-time message delivery and tracking",
    ],
    image: "📱",
    backgroundImage: "📡",
    category: "Web",
    year: "2019-2020",
    users: "100K+ SMS subscribers",
    impact: "SMS management tool for clients in Kenya.",
  }
];



// Portal Modal Component for full-screen modal rendering
function PortalModal({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(children, document.body);
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1] as const, // easeOut
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 1, 1] as const, // easeIn
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.15 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };
  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "Web":
        return "bg-sky-100 text-sky-800";
      case "fullstack":
        return "bg-green-100 text-green-800";
      case "enterprise":
        return "bg-purple-100 text-purple-800";
      case "PHP":
        return "bg-yellow-100 text-yellow-800";
      case "JavaScript":
        return "bg-blue-100 text-blue-800";

      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getCategoryGradient = (category: Project["category"]) => {
    switch (category) {
      case "Web":
        return "rgba(56, 189, 248, 0.2) 0%, rgba(14, 165, 233, 0.1) 100%";
      case "fullstack":
        return "rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%";
      case "enterprise":
        return "rgba(147, 51, 234, 0.2) 0%, rgba(126, 34, 206, 0.1) 100%";
      case "PHP":
        return "rgba(250, 204, 21, 0.2) 0%, rgba(202, 138, 4, 0.1) 100%";
      case "JavaScript":
        return "rgba(37, 99, 235, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%";
      default:
        return "rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.1) 100%";
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-1 tracking-tight">
            Featured Work
          </h3>
          <p className="text-sm text-slate-600 font-medium">
            Web applications serving 100K+ users & handling millions in transactions
          </p>
        </div>

        <motion.div
          className="px-4 py-2 bg-slate-200/60 rounded-full border border-slate-300/60"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(226 232 240)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-xs font-medium text-slate-700">4 Projects</span>
        </motion.div>
      </div>

      {/* Project Cards Container with Scrolling - Extra padding for hover effects */}
      <div className="relative">
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-animated scroll-smooth"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onScroll={checkScrollPosition}
          style={{ marginBottom: "3rem", paddingBottom: "1rem" }} // Extra space for hover effects and shadows
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="min-w-[280px] max-w-[280px] flex-shrink-0"
            >
              {/* Project Card with Background Image */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
                transition={{ duration: 0.2 }}
                className="relative bg-white backdrop-blur-sm rounded-2xl p-6 cursor-pointer border border-slate-200/60 hover:border-slate-300/80 hover:shadow-xl transition-all duration-500 group overflow-hidden h-64"
              >
                {/* Dynamic Background Gradient */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: project.backgroundImage }}
                />

                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header: Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="text-4xl filter drop-shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.image}
                    </motion.div>
                    <motion.span
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(
                        project.category
                      )}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      {project.category}
                    </motion.span>
                  </div>

                  {/* Project Title & Description */}
                  <div className="flex-grow">
                    <motion.h4
                      className="font-bold text-slate-900 text-lg mb-2 group-hover:text-slate-800 transition-colors duration-300 leading-tight"
                      layout
                    >
                      {project.title}
                    </motion.h4>
                    <motion.p
                      className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed"
                      layout
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Stats & CTA */}
                  <div className="mt-auto">
                    <motion.div
                      className="flex justify-between items-center text-xs mb-3"
                      layout
                    >
                      <span className="text-slate-500 font-medium bg-white/70 px-2 py-1 rounded-lg backdrop-blur-sm">
                        {project.year}
                      </span>
                      {project.impact && (
                        <span className="text-slate-700 font-semibold bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                          {project.impact}
                        </span>
                      )}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      className="flex items-center gap-2 text-sm text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300 bg-white/80 px-3 py-2 rounded-xl backdrop-blur-sm"
                      layout
                    >
                      <span>View Details</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Arrows - Below the list */}
        <div className="flex justify-end gap-2 mt-4">
          <motion.button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md ${
              canScrollLeft
                ? "bg-white/90 hover:bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl"
                : "bg-slate-200/70 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            whileHover={canScrollLeft ? { scale: 1.05, y: -2 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md ${
              canScrollRight
                ? "bg-white/90 hover:bg-white border-slate-300 text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl"
                : "bg-slate-200/70 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            whileHover={canScrollRight ? { scale: 1.05, y: -2 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Portal Modal for full-screen positioning */}
      <PortalModal isOpen={!!selectedProject}>
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[99999]"
              onClick={() => setSelectedProject(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
              }}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative shadow-2xl mx-auto scrollbar-custom"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  zIndex: 100000,
                  maxWidth: "min(90vw, 900px)",
                  maxHeight: "min(90vh, 800px)",
                }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  transition={{ duration: 0.15 }}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-3 transition-all duration-300 backdrop-blur-md border border-slate-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Project Header */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="text-4xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {selectedProject.image}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {selectedProject.title}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                          selectedProject.category
                        )}`}
                      >
                        {selectedProject.category}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {selectedProject.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{selectedProject.year}</span>
                      {selectedProject.users && (
                        <span>• {selectedProject.users} users</span>
                      )}
                      {selectedProject.impact && (
                        <span>• {selectedProject.impact}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Key Achievements
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-slate-700 text-sm">
                          {achievement}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PortalModal>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-slate-600 text-center">
        💼 Currently open to new opportunities • 🌍 Available globally
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
