"use client";

import { motion } from "framer-motion";

const projects = [
{
title: "AI Desktop Assistant",
description:
"An intelligent desktop assistant powered by AI with voice commands, automation, and smart interactions.",
tech: "Python • Gemini API • FastAPI",
},
{
title: "Placement Management System",
description:
"A complete Training & Placement portal for students, companies, and administrators.",
tech: "Flutter • Firebase • Firestore",
},
{
title: "Professional Dashboard",
description:
"An interactive Power BI dashboard that analyzes Amazon product reviews, ratings, discounts, pricing, and category-wise performance to uncover key product insights and customer trends.",
tech: "Power BI",
},
];

export default function Projects() {
return ( <section
   id="projects"
   className="relative min-h-screen px-6 py-24 overflow-hidden"
 >
{/* Background */} <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#070311] to-[#1b0d34]" />


  {/* Stars */}
  <div className="absolute inset-0 -z-10">
    <div className="stars"></div>
  </div>

  {/* Purple Glow */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[220px] -z-10" />

  {/* Cyan Glow */}
  <div className="absolute top-40 left-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[150px] -z-10" />

  <div className="absolute bottom-40 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[180px] -z-10" />

  {/* Floating Dots */}
  <div className="absolute top-32 left-20 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse" />

  <div className="absolute top-52 right-32 w-4 h-4 bg-purple-500 rounded-full blur-sm animate-pulse" />

  <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse" />

  <div className="max-w-7xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-5xl md:text-6xl font-bold mb-20"
    >
      My{" "}
      <span className="bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
        Projects
      </span>
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          whileHover={{
            y: -12,
            scale: 1.03,
          }}
          transition={{ duration: 0.3 }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-8
            shadow-[0_0_30px_rgba(139,92,246,0.15)]
            hover:shadow-[0_0_60px_rgba(139,92,246,0.35)]
            transition-all
          "
        >
          {/* Card Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              {project.title}
            </h3>

            <p className="text-gray-400 leading-7 mb-6">
              {project.description}
            </p>

            <p className="text-cyan-400 text-sm mb-8">
              {project.tech}
            </p>

            <div className="flex gap-3">
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white font-medium">
                GitHub
              </button>

              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-black font-semibold">
                Live Demo
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


);
}
