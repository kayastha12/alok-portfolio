"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  year: string;
  title: string;
  desc: string;
}

interface ExperienceProps {
  data?: ExperienceItem[];
}

const defaultExperiences = [
  {
    year: "2022",
    title: "Started BCA Journey",
    desc: "Began Bachelor of Computer Applications and explored programming fundamentals, database schemas, and OOP concepts.",
  },
  {
    year: "2025",
    title: "Started MCA Journey",
    desc: "Enrolled in Master of Computer Applications at GNIOT to deepen knowledge of systems design and advanced software engineering.",
  },
  {
    year: "2025",
    title: "Data Analytics & Power BI Focus",
    desc: "Analyzed consumer and product data, writing business logic metrics (DAX) and designing executive dashboard reports.",
  },
  {
    year: "2026",
    title: "AI & Machine Learning Engineering",
    desc: "Engineered desktop assistant automations and document search engines utilizing Gemini APIs, Python backend scripts, and FastAPI.",
  },
  {
    year: "2026",
    title: "Full Stack Development",
    desc: "Built full-stack placement portal systems with cross-platform Dart/Flutter frontends and Cloud Firebase databases.",
  },
];

export default function Experience({ data }: ExperienceProps) {
  const experiences = data || defaultExperiences;

  return ( 
    <section
      id="experience"
      className="relative min-h-screen px-6 py-24 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="flex items-center justify-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> Developer Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-luxury-text leading-tight font-manrope">
            Academic & Tech Timeline
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[1.5px] bg-gradient-to-b from-luxury-accent via-luxury-border to-luxury-border/30"></div>

          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative mb-16 flex flex-col md:flex-row
                ${
                  index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                }
              `}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4.5 h-4.5 rounded-full bg-luxury-accent border-4 border-luxury-bg shadow-[0_0_12px_rgba(36,93,102,0.25)] z-20"></div>

              {/* Card */}
              <div
                className="
                  ml-12 md:ml-0
                  md:w-[45%]
                  bg-luxury-card
                  border border-luxury-border
                  rounded-2xl
                  p-6
                  shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.02)]
                  hover:border-luxury-accent/30 hover:shadow-[0_10px_30px_rgba(6,182,212,0.04),inset_0_1px_0_rgba(255,255,255,0.05)]
                  transition-all duration-300
                "
              >
                <span className="text-luxury-accent font-bold text-xs uppercase tracking-wider">
                  {item.year}
                </span>

                <h3 className="text-xl font-bold text-luxury-text mt-2 mb-4 leading-snug font-manrope">
                  {item.title}
                </h3>

                <p className="text-luxury-muted text-sm md:text-base leading-relaxed font-semibold">
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
