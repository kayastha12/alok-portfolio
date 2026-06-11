"use client";

import { motion } from "framer-motion";

const experiences = [
{
year: "2022",
title: "Started BCA Journey",
desc: "Began Bachelor of Computer Applications and explored programming fundamentals.",
},
{
year: "2025",
title: "Started MCA Journey",
desc: "Began Masters of Computer Applications and explored programming fundamentals.",
},
{
year: "2025",
title: "Data Analytics & Power BI",
desc: "Worked on dashboards, data visualization, SQL, and business analytics concepts.",
},
{
year: "2026",
title: "AI & Machine Learning",
desc: "Built AI-powered applications using Python, APIs, and modern AI technologies.",
},
{
year: "2026",
title: "Full Stack Development",
desc: "Developed Flutter, Next.js, Firebase, and FastAPI based projects.",
},
];

export default function Experience() {
return ( <section
   id="experience"
   className="relative min-h-screen px-6 py-24 overflow-hidden"
 >
{/* Background */} <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#090414] to-[#2a1248]" />

  {/* Stars */}
  <div className="absolute inset-0 -z-10">
    <div className="stars"></div>
  </div>

  {/* Purple Glow */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[220px] -z-10" />

  {/* Cyan Glow */}
  <div className="absolute top-32 left-20 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[150px] -z-10" />

  <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[180px] -z-10" />

  {/* Floating Dots */}
  <div className="absolute top-32 left-24 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>

  <div className="absolute top-52 right-32 w-4 h-4 bg-purple-500 rounded-full blur-sm animate-pulse"></div>

  <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>

  <div className="max-w-6xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-5xl md:text-6xl font-bold mb-24"
    >
      My{" "}
      <span className="bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
        Journey
      </span>
    </motion.h2>

    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-cyan-400"></div>

      {experiences.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className={`
            relative mb-16 flex
            ${
              index % 2 === 0
                ? "md:justify-start"
                : "md:justify-end"
            }
          `}
        >
          {/* Dot */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]"></div>

          {/* Card */}
          <div
            className="
              ml-14 md:ml-0
              md:w-[45%]
              bg-white/[0.05]
              backdrop-blur-xl
              border border-white/10
              rounded-3xl
              p-8
              shadow-[0_0_30px_rgba(139,92,246,0.15)]
              hover:shadow-[0_0_60px_rgba(139,92,246,0.3)]
              transition-all
            "
          >
            <span className="text-cyan-400 font-semibold">
              {item.year}
            </span>

            <h3 className="text-2xl font-bold text-white mt-2 mb-4">
              {item.title}
            </h3>

            <p className="text-gray-400 leading-7">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


);
}
