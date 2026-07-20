"use client";

import { motion } from "framer-motion";

const areas = [
  { label: "🤖 GenAI Applications", color: "text-luxury-accent border-luxury-accent/30 bg-luxury-accent/5" },
  { label: "📊 Power BI Dashboards", color: "text-luxury-accent border-luxury-accent/30 bg-luxury-accent/5" },
  { label: "📱 Cross-Platform Mobile", color: "text-luxury-accent border-luxury-accent/30 bg-luxury-accent/5" },
  { label: "🔌 RESTful API Backends", color: "text-luxury-accent border-luxury-accent/30 bg-luxury-accent/5" },
  { label: "☁️ Firebase Firestore Cloud", color: "text-luxury-accent border-luxury-accent/30 bg-luxury-accent/5" },
  { label: "🎙️ Custom Voice Automation", color: "text-luxury-accent border-luxury-accent/30 bg-luxury-accent/5" }
];

export default function FocusAreas() {
  return (
    <section className="py-16 bg-luxury-bg border-t border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-[10px] font-bold text-luxury-muted uppercase tracking-widest block mb-4">
          Platforms & Focus Areas
        </span>
        
        <h3 className="text-xl md:text-2xl font-black text-luxury-text mb-8 font-manrope">
          Delivering High-Performance Systems Across Domains
        </h3>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {areas.map((area, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-6 py-2.5 rounded-full border text-sm font-bold tracking-wide shadow-sm cursor-default ${area.color}`}
            >
              {area.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

