"use client";

import { motion } from "framer-motion";
import Hero3D from "./Hero3D";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-6"
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0"></div>

      {/* 3D Background */}
      <Hero3D />

      {/* Glow Effects */}
      <div className="glow top-10 left-10"></div>
      <div className="glow bottom-10 right-10"></div>
      <div className="glow top-0 left-1/2 -translate-x-1/2"></div>

      {/* Floating Neon Dots */}
      <div className="absolute top-40 left-20 w-3 h-3 rounded-full bg-cyan-400 blur-sm animate-pulse z-10"></div>
      <div className="absolute top-60 right-40 w-4 h-4 rounded-full bg-purple-500 blur-sm animate-pulse z-10"></div>
      <div className="absolute bottom-40 left-1/3 w-3 h-3 rounded-full bg-cyan-400 blur-sm animate-pulse z-10"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black/20 to-black"></div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-cyan-400 uppercase tracking-[6px] mb-6 text-sm md:text-base"
        >
          Welcome To My World
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Alok
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-2 text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
        >
          AI & Data Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto text-gray-300 mt-8 text-lg md:text-xl leading-relaxed"
        >
          Building AI-powered applications, Data Analytics solutions,
          modern software systems, and immersive digital experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mt-12"
        >
          {/* Resume Button */}
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-8 py-4 rounded-full
              bg-gradient-to-r
              from-purple-600
              to-violet-500
              text-white
              font-semibold
              shadow-[0_0_40px_rgba(139,92,246,0.6)]
              transition-all
            "
          >
            📄 Download Resume
          </motion.a>

          {/* AI Button */}
          
<motion.button
  onClick={() => {
    const btn = document.getElementById("chatbot-toggle");
    btn?.click();
  }}
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  className="
    px-8 py-4 rounded-full
    bg-gradient-to-r
    from-cyan-400
    to-sky-400
    text-black
    font-bold
    shadow-[0_0_40px_rgba(34,211,238,0.6)]
  "
>
  Ask AI About Me
</motion.button>


        </motion.div>
      </div>
    </section>
  );
}
