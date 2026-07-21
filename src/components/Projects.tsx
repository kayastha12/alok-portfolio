"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
  order?: number;
  image?: string;
}

interface ProjectsProps {
  data?: Project[];
}

const defaultProjects: Project[] = [
  {
    title: "AI Desktop Assistant",
    description: "An intelligent helper powered by Gemini API, executing voice actions and script triggers.",
    longDescription: "A comprehensive voice-activated AI companion that runs locally on Windows. It listens to audio triggers, interprets commands using Gemini's model, and performs desktop tasks like opening files, executing shell scripts, searching directories, or automating system configurations. Built on FastAPI for lightning-fast router responses.",
    tech: ["Python", "Gemini API", "FastAPI", "SpeechRecognition"],
    features: [
      "Voice activation and live transcription",
      "System automation (shell script execution, directory searches)",
      "Open API endpoints managed through FastAPI",
      "Robust offline error-handling layers"
    ],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  },
  {
    title: "Amazon Reviews Dashboard",
    description: "Interactive dashboard highlighting consumer insights and rating margins.",
    longDescription: "An enterprise-grade Power BI business intelligence dashboard analyzing product listings on Amazon. It transforms raw product data (ratings, categories, discounts, reviews) into clear visualizations to identify product trends, pricing elasticities, and satisfaction scores. Built with custom DAX logic metrics.",
    tech: ["Power BI Desktop", "DAX logic", "Data ETL & Analytics", "SQL Server"],
    features: [
      "Dynamic interactive filters and KPI headers",
      "Data cleaning and modeling in Power Query",
      "DAX expressions for margin calculation and trend vectors",
      "Clean executive reporting layout"
    ],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  },
  {
    title: "Placement Portal",
    description: "Role-based training and placement application with Firestore sync.",
    longDescription: "A role-based university portal managing training and campus drives. Built for students, training coordinators, and recruiting partners. It coordinates job announcements, profile registrations, application status updates, and interview notifications with real-time Firebase Firestore data synchronization.",
    tech: ["Flutter & Dart", "Google Firebase", "Cloud Firestore", "Cloud Messaging"],
    features: [
      "Role-based authentication (Admin, Recruiter, Student)",
      "Real-time applicant progress and scheduling tracking",
      "Instant push notifications via Cloud Messaging",
      "Downloadable resume and document repository"
    ],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  },
  {
    title: "Online Voting System (OVS)",
    description: "Secure cross-platform voting platform utilizing robust authentication.",
    longDescription: "A secure mobile voting application built on Flutter. It provides voters with simple verification, active election dashboards, candidate profile views, and secure ballot submissions. Powered by Firebase cloud authentication to protect integrity.",
    tech: ["Flutter & Dart", "Firebase Auth", "Cloud Firestore", "Security Rules"],
    features: [
      "Multi-factor voter credentials verification",
      "Real-time vote counts and audit logs",
      "Completely responsive mobile design layouts",
      "Tamper-proof backend rules configured on Firestore"
    ],
    demoUrl: "#contact",
    githubUrl: "https://github.com"
  }
];

export default function Projects({ data }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  // Sort projects by order key
  const projects = (data || defaultProjects).sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 py-24 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> Showcase Cards
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-luxury-text leading-tight font-manrope">
            Featured Projects
          </h2>
          <p className="text-luxury-muted mt-4 text-sm md:text-base leading-relaxed font-semibold">
            Explore case studies of software architectures, machine learning automation, and data analytics.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleProjectClick(project)}
              className="
                relative flex flex-col justify-between
                overflow-hidden
                rounded-2xl
                border border-luxury-border
                bg-luxury-card
                p-6
                shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.02)]
                hover:border-luxury-accent/30 hover:shadow-[0_12px_36px_rgba(6,182,212,0.04),inset_0_1px_0_rgba(255,255,255,0.05)]
                transition-all duration-300
                cursor-pointer
                h-full
              "
            >
              <div>
                {project.image && (
                  <div className="relative w-full h-[190px] rounded-xl overflow-hidden mb-5 bg-luxury-bg border border-luxury-border/40">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                )}
                {/* Tech Tags & Links Row */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-md bg-luxury-bg border border-luxury-border text-[9px] font-bold text-luxury-text"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2.5 py-1 rounded-md bg-luxury-bg border border-luxury-border text-[9px] font-bold text-luxury-text">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1.5">
                    {project.githubUrl && project.githubUrl !== "" && project.githubUrl !== "#contact" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-luxury-bg border border-luxury-border text-luxury-muted hover:text-luxury-accent hover:border-luxury-accent/30 transition-colors"
                        title="GitHub Repository Link"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}

                    {project.demoUrl && project.demoUrl !== "" && project.demoUrl !== "#contact" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-luxury-bg border border-luxury-border text-luxury-muted hover:text-luxury-accent hover:border-luxury-accent/30 transition-colors"
                        title="Live Demo Link"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-luxury-text mb-2.5 leading-snug font-manrope">
                  {project.title}
                </h3>

                <p className="text-xs text-luxury-muted leading-relaxed font-semibold mb-6">
                  {project.description}
                </p>
              </div>

              {/* Interaction prompt */}
              <div className="flex items-center justify-between pt-4 border-t border-luxury-border text-[10px] font-bold text-luxury-accent/90 uppercase tracking-wider group">
                <span>View Case Study</span>
                <div className="w-6 h-6 rounded-full bg-luxury-bg border border-luxury-border flex items-center justify-center group-hover:bg-luxury-accent group-hover:text-white transition-all duration-300">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-text/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-luxury-card border border-luxury-border max-w-2xl w-full rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-luxury-bg border border-luxury-border/80 flex items-center justify-center hover:bg-luxury-hover transition-colors text-luxury-text"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Title & Tag */}
              <span className="text-[10px] font-bold text-luxury-accent uppercase tracking-widest block mb-2">
                Project Case Study
              </span>
              <h3 className="text-3xl font-extrabold text-luxury-text mb-6 font-manrope">
                {activeProject.title}
              </h3>

              {/* Long Description */}
              <p className="text-luxury-muted leading-relaxed font-semibold text-sm md:text-base mb-8">
                {activeProject.longDescription}
              </p>

              {/* Key Features */}
              {activeProject.features && activeProject.features.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-luxury-text uppercase tracking-wider mb-4">
                    Key Technical Features
                  </h4>
                  <div className="grid gap-3">
                    {activeProject.features.map((f, i) => (
                      <div key={i} className="flex gap-3 items-start text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-accent mt-2 flex-shrink-0"></span>
                        <span className="text-luxury-muted font-semibold">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack List */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-luxury-text uppercase tracking-wider mb-3">
                  Stack & Toolkits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-3.5 py-1.5 rounded-full bg-luxury-bg border border-luxury-border text-xs font-bold text-luxury-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 border-t border-luxury-border/60 pt-6 mt-8">
                {activeProject.githubUrl && activeProject.githubUrl !== "" && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    className="flex-1 text-center py-3 rounded-full bg-luxury-card border border-luxury-border text-luxury-text font-bold text-xs md:text-sm hover:bg-luxury-hover transition-colors"
                  >
                    GitHub Source
                  </a>
                )}

                {activeProject.demoUrl && activeProject.demoUrl !== "" && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    className="flex-1 text-center py-3 rounded-full bg-luxury-accent text-white font-black text-xs md:text-sm hover:bg-luxury-accent-hover transition-colors shadow-sm"
                  >
                    {activeProject.demoUrl !== "#contact" ? "Live Project" : "Request Demo"}
                  </a>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
