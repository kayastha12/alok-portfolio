"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface WhyChooseProps {
  data?: {
    badge?: string;
    title?: string;
    items?: {
      title: string;
      description: string;
    }[];
  };
}

const defaultItems = [
  {
    title: "Certified & Verified",
    description: "Internshala certified Java programmer with high-marks MCA software engineering foundations."
  },
  {
    title: "Data-Driven Focus",
    description: "Transforming messy databases and datasets into clean, actionable dashboard reports."
  },
  {
    title: "Intelligent Automation",
    description: "Crafting customized AI agents using Python, LangChain, and state-of-the-art LLM capabilities."
  },
  {
    title: "Modern Tech Stack",
    description: "Leveraging scalable frameworks like Flutter, FastAPI, Next.js, and Firebase services."
  }
];

const getIcon = (idx: number) => {
  switch (idx) {
    case 0:
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 1:
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 2:
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 3:
    default:
      return (
        <svg className="w-5 h-5 text-luxury-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
  }
};

export default function WhyChoose({ data }: WhyChooseProps) {
  const badge = data?.badge || "Philosophy";
  const title = data?.title || "Why Choose Alok?";
  const items = data?.items || defaultItems;

  return (
    <section
      className="relative px-6 py-24 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-start gap-8">
        
        {/* Why Choose Items */}
        <div className="w-full flex flex-col items-start text-left">
          
          <div className="flex items-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> {badge}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-luxury-text leading-tight font-manrope">
            {title}
          </h2>
          <p className="text-luxury-muted mt-3 text-sm md:text-base leading-relaxed font-semibold">
            Experience the benefit of engineering precision, proactive communication, and high adaptability.
          </p>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mt-10 w-full">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-luxury-card border border-luxury-border/60 rounded-3xl p-6.5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-luxury-accent/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-luxury-bg border border-luxury-border/40 w-fit mb-5">
                    {getIcon(idx)}
                  </div>
                  <h3 className="font-extrabold text-base text-luxury-text mb-2 font-manrope">
                    {item.title}
                  </h3>
                  <p className="text-xs text-luxury-muted leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
