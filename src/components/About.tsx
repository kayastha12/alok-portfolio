"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutProps {
  data?: {
    badgeText: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    highlightText: string;
    avatarSrc: string;
  };
}

export default function About({ data }: AboutProps) {
  const badgeText = data?.badgeText || "About Me";
  const heading = data?.heading || "Architecting Intelligent Solutions";
  const paragraph1 = data?.paragraph1 || "I am a dedicated MCA student at GNIOT Group of Institutions, Greater Noida, with a strong foundation in computer applications (BCA from MGKVP, Varanasi). I specialize in developing cross-platform mobile applications using Flutter and implementing reliable backend solutions with Firebase.";
  const paragraph2 = data?.paragraph2 || "My technical focus is at the intersection of AI integration and Data Analytics. I build intelligent helpers powered by LLM endpoints, deploy custom voice automation agents, and transform transactional databases into business intelligence reporting systems using Power BI Desktop and advanced DAX modeling.";
  const highlightText = data?.highlightText || "Combining mobile engineering, machine learning pipelines, and data visualization to construct reliable digital products.";
  const avatarSrc = data?.avatarSrc || "/profile.jpg";

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      {/* Content Area */}
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-start gap-8">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-start text-left"
        >
          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> {badgeText}
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-luxury-text leading-tight mb-6 font-manrope">
            Alok Srivastav <span className="text-luxury-accent">®</span>
          </h2>

          <div className="space-y-4 text-luxury-muted text-base md:text-lg leading-relaxed font-medium">
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
          </div>

          {/* Highlight text block */}
          {highlightText && (
            <p className="border-l-2 border-luxury-accent pl-4 text-xs font-bold uppercase tracking-wider text-luxury-accent mt-6">
              {highlightText}
            </p>
          )}

          {/* Read Story Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-luxury-accent text-white font-bold text-xs tracking-wide mt-8 shadow-[0_4px_15px_rgba(36,93,102,0.2)] hover:bg-luxury-accent-hover transition-all duration-300 group"
          >
            Read My Full Story
            <div className="w-5 h-5 rounded-full bg-luxury-bg flex items-center justify-center">
              <svg 
                className="w-3 h-3 text-luxury-accent transform group-hover:translate-x-0.5 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.a>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-12 w-full">
            
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-luxury-card border border-luxury-border rounded-2xl p-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:border-luxury-accent/30 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-luxury-text">10+</h3>
              <p className="text-luxury-muted text-xs md:text-sm mt-1 font-medium">Completed Projects</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-luxury-card border border-luxury-border rounded-2xl p-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:border-luxury-accent/30 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-luxury-text font-mono">SW / AI</h3>
              <p className="text-luxury-muted text-xs md:text-sm mt-1 font-medium">Developer Focus</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-luxury-card border border-luxury-border rounded-2xl p-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:border-luxury-accent/30 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-luxury-text">MCA</h3>
              <p className="text-luxury-muted text-xs md:text-sm mt-1 font-medium">Academic Scholar</p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}