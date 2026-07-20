"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  data?: {
    badgeText: string;
    greeting: string;
    name: string;
    roles: string[];
    description: string;
    viewWorkText: string;
    downloadResumeText: string;
    photo: {
      src: string;
      scale: number;
      positionY: number;
      opacity: number;
      contrast: number;
      brightness: number;
      saturate: number;
    };
    background: {
      curvesVisible: boolean;
      glowCyan: boolean;
      glowPurple: boolean;
    };
  };
}

export default function Hero({ data }: HeroProps) {
  // Safe Fallbacks
  const badgeText = data?.badgeText || "Available for new opportunities";
  const greeting = data?.greeting || "Hello,";
  const name = data?.name || "Alok Srivastav";
  const roles = data?.roles || ["AI Engineer", "Data Analyst", "Full Stack Developer"];
  const description = data?.description || "Helping organizations engineer intelligent systems, deploy custom voice automation agents, and design rich Power BI dashboards that translate raw data into business intelligence.";
  const viewWorkText = data?.viewWorkText || "View My Work";
  const downloadResumeText = data?.downloadResumeText || "Download Resume";
  
  const photo = {
    src: data?.photo?.src || "/profile_suit_transparent.png",
    scale: data?.photo?.scale !== undefined ? data?.photo.scale : 1.25,
    positionY: data?.photo?.positionY !== undefined ? data?.photo.positionY : 60,
    opacity: data?.photo?.opacity !== undefined ? data?.photo.opacity : 0.88,
    contrast: data?.photo?.contrast !== undefined ? data?.photo.contrast : 1.08,
    brightness: data?.photo?.brightness !== undefined ? data?.photo.brightness : 0.96,
    saturate: data?.photo?.saturate !== undefined ? data?.photo.saturate : 1.05
  };

  const curvesVisible = data?.background?.curvesVisible !== false;
  const glowCyan = data?.background?.glowCyan !== false;
  const glowPurple = data?.background?.glowPurple !== false;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-20 bg-luxury-bg transition-colors duration-500"
    >
      {/* 1. Volumetric Light Blobs behind the person (Teal & Purple) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Cyan/Teal glow behind head */}
        {glowCyan && (
          <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-radial from-[#206F7A]/25 via-[#206F7A]/5 to-transparent blur-[120px] rounded-full animate-pulse" style={{ animationDuration: "8s" }} />
        )}
        
        {/* Soft Purple glow behind shoulders */}
        {glowPurple && (
          <div className="absolute top-[25%] right-[15%] w-[450px] h-[450px] bg-radial from-purple-900/15 via-purple-900/2 to-transparent blur-[100px] rounded-full" />
        )}
        
        {/* Soft Radial light behind the head */}
        <div className="absolute top-[15%] right-[10%] w-[250px] h-[250px] bg-white/5 blur-3xl rounded-full" />

        {/* Ambient background curve waves */}
        {curvesVisible && (
          <svg 
            className="absolute bottom-0 left-0 w-full h-[40%] opacity-20 dark:opacity-40 pointer-events-none z-10" 
            fill="none" 
            viewBox="0 0 1440 300"
          >
            <path 
              d="M0 150 C 300 220, 600 80, 900 240 C 1200 320, 1300 180, 1440 210" 
              stroke="currentColor" 
              className="text-luxury-accent" 
              strokeWidth="1.5" 
            />
            <path 
              d="M0 180 C 400 270, 700 110, 1000 270 C 1300 350, 1400 150, 1440 190" 
              stroke="currentColor" 
              className="text-luxury-accent/50" 
              strokeWidth="1" 
            />
          </svg>
        )}
      </div>

      {/* 2. Floating Atmospheric Dust & Light Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#206F7A]/40 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: "12s" }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-500/30 rounded-full blur-[1px] animate-ping" style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/2 right-[10%] w-2.5 h-2.5 bg-white/20 rounded-full blur-[2px] animate-pulse" style={{ animationDuration: "9s" }} />
        <div className="absolute bottom-1/3 right-[20%] w-1.5 h-1.5 bg-[#206F7A]/30 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: "15s" }} />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-20 max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-luxury-accent/30 bg-luxury-accent/5 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-luxury-accent animate-pulse"></span>
            <span className="text-[10px] font-bold text-luxury-accent tracking-widest uppercase">
              {badgeText}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-luxury-text leading-[1.05] tracking-tight font-manrope"
          >
            {greeting} <br />
            I'm <span className="text-luxury-accent">{name}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm md:text-base font-bold text-luxury-text/80 tracking-wide font-manrope flex items-center gap-2 flex-wrap"
          >
            {roles.map((role, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>{role}</span>
                {idx < roles.length - 1 && (
                  <span className="text-luxury-accent font-bold">•</span>
                )}
              </span>
            ))}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-luxury-muted text-sm md:text-base leading-relaxed max-w-xl font-medium"
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto"
          >
            {/* View Work (Teal Solid) */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6.5 py-3.5 rounded-xl bg-luxury-accent text-white font-bold text-xs md:text-sm tracking-wide shadow-[0_4px_20px_rgba(36,93,102,0.2)] hover:bg-luxury-accent-hover transition-all duration-300"
            >
              {viewWorkText}
              <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            {/* Download Resume (Border) */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6.5 py-3.5 rounded-xl bg-luxury-card border border-luxury-border text-luxury-text font-bold text-xs md:text-sm hover:bg-luxury-hover transition-all duration-300"
            >
              {downloadResumeText}
              <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Connect Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-col items-start"
          >
            <span className="text-[10px] font-bold text-luxury-muted uppercase tracking-widest block mb-4">
              Connect with me
            </span>

            <div className="flex gap-4">
              {[
                {
                  href: "https://github.com",
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )
                },
                {
                  href: "https://www.linkedin.com/in/alok-srivastav-03b17a33b",
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )
                },
                {
                  href: "mailto:aloksrivastav489@gmail.com",
                  icon: (
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  href: "/resume.pdf",
                  icon: (
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-luxury-border flex items-center justify-center text-luxury-text/70 hover:text-luxury-accent hover:border-luxury-accent/30 hover:bg-luxury-accent/5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column (Showcase Portrait cutout smoothly integrated) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col justify-end w-full relative h-[650px] select-none"
        >
          {/* Portrait Image Cutout Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={photo.src}
              alt="Alok Srivastav Cutout"
              fill
              priority
              style={{
                opacity: photo.opacity,
                transform: `scale(${photo.scale}) translateY(${photo.positionY}px)`,
                filter: `contrast(${photo.contrast}) saturate(${photo.saturate}) brightness(${photo.brightness}) drop-shadow(0 0 20px rgba(32,111,122,0.25)) drop-shadow(0 0 40px rgba(124,58,237,0.12))`,
                transformOrigin: "bottom",
                maskImage: "linear-gradient(to top, transparent 18%, black 48%)",
                WebkitMaskImage: "linear-gradient(to top, transparent 18%, black 48%)"
              }}
              className="object-contain object-bottom w-full h-full transition-all duration-500"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
