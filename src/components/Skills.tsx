"use client";

import { motion } from "framer-motion";

interface SkillsProps {
  data?: {
    title: string;
    description: string;
    skills: string[];
    icon: string;
  }[];
}

const defaultCategories = [
  {
    title: "AI & Machine Learning",
    description: "Developing automated voice systems, generative agents, and document search tools.",
    skills: ["Python", "Gemini API", "RAG Pipelines", "FastAPI API"],
    icon: "AI"
  },
  {
    title: "Data Analytics & BI",
    description: "Transforming transactional datasets into clean, actionable interactive dashboard layouts.",
    skills: ["Power BI", "DAX calculations", "SQL Queries", "Data Modeling"],
    icon: "Analytics"
  },
  {
    title: "Mobile & Web",
    description: "Building responsive, modern products featuring cross-platform components and fast loads.",
    skills: ["Flutter & Dart", "Next.js & React", "Tailwind CSS", "Firebase UI"],
    icon: "Mobile"
  },
  {
    title: "Databases & API",
    description: "Architecting backend microservices and databases configured to maximize speed.",
    skills: ["Cloud Firestore", "SQL Server", "FastAPI Router", "REST endpoints"],
    icon: "Database"
  },
  {
    title: "Developer Tools",
    description: "Managing project source codes, testing apps, and compiling systems.",
    skills: ["Git & GitHub", "PyCharm & VS Code", "Android Studio", "Firebase Auth"],
    icon: "Tools"
  }
];

const renderIconSVG = (iconName: string) => {
  switch (iconName) {
    case "AI":
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "Analytics":
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "Mobile":
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "Database":
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case "Tools":
    default:
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
  }
};

const renderIcon = (iconName: string) => {
  const isImagePath = iconName.startsWith("/") || iconName.startsWith("http") || iconName.startsWith("data:");
  if (isImagePath) {
    return (
      <img
        src={iconName}
        alt="Skill Icon"
        className="w-5 h-5 object-contain filter brightness-100"
      />
    );
  }
  return renderIconSVG(iconName);
};

export default function Skills({ data }: SkillsProps) {
  const categories = data || defaultCategories;

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> Technical Skills
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-luxury-text leading-tight font-manrope">
            Professional Expertise
          </h2>
          <p className="text-luxury-muted mt-4 text-sm md:text-base leading-relaxed font-semibold">
            Categorized engineering skills and frameworks configured to build intelligent software solutions.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col justify-between rounded-[2rem] p-8 border border-luxury-border/60 bg-luxury-card shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-luxury-accent/25 transition-all duration-300"
            >
              <div>
                {/* Header Row */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-luxury-bg border border-luxury-border/40">
                    {renderIcon(category.icon)}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-luxury-text mb-2 leading-snug font-manrope">
                  {category.title}
                </h3>
                <p className="text-sm text-luxury-muted leading-relaxed mb-6 font-semibold">
                  {category.description}
                </p>

                {/* Skills Tags List */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-luxury-bg border border-luxury-border text-xs font-bold text-luxury-text hover:border-luxury-accent/30 cursor-default transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}