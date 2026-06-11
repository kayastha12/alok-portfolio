"use client";

import { motion } from "framer-motion";

const skills = [
  {
    title: "AI & Data",
    items: ["Python", "RAG", "Data Analytics", "Power BI"],
  },
  {
    title: "Development",
    items: ["Flutter", "Dart", "Google Firebase", "Google Firestore"],
  },
  {
    title: "Tools",
    items: ["PyCharm", "GitHub", "Android Studio", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="stars"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />

        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-violet-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Floating Dots */}
      <div className="absolute top-32 left-24 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse" />

      <div className="absolute bottom-40 right-32 w-4 h-4 bg-purple-500 rounded-full blur-sm animate-pulse" />

      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-bold mb-20"
        >
          My{" "}
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Skills
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              transition={{ duration: 0.4 }}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-8
                shadow-[0_0_40px_rgba(139,92,246,0.15)]
                hover:shadow-[0_0_70px_rgba(34,211,238,0.25)]
                transition-all duration-500
              "
            >
              {/* Card Glow */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />

                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  {skill.title}
                </h3>

                <div className="space-y-4">
                  {skill.items.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 8 }}
                      className="
                        flex items-center gap-3
                        bg-black/30
                        border border-white/10
                        rounded-2xl
                        px-4 py-3
                        text-gray-300
                        hover:border-cyan-400/30
                        transition-all
                      "
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>

                      {item}
                    </motion.div>
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