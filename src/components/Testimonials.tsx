"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

interface TestimonialsProps {
  data?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Alok delivered the AI Desktop Assistant with exceptional attention to code quality and automation detail. His RAG implementation has significantly optimized our document lookups.",
    author: "Project Lead",
    role: "Open Source Contributor",
  },
  {
    quote: "The Amazon Reviews Dashboard built by Alok completely transformed how we analyze listing trends. The DAX logic is robust and the visualizations are boardroom-ready.",
    author: "Marketing Director",
    role: "E-Commerce Partner",
  },
  {
    quote: "Alok is a proactive developer. He structured the backend APIs of our placement system with extreme speed, matching high-load API response standards.",
    author: "Systems Architect",
    role: "Academic Project Sponsor",
  }
];

export default function Testimonials({ data }: TestimonialsProps) {
  const testimonials = data || defaultTestimonials;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds auto slide

    return () => clearInterval(timer);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> Collaborations
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-luxury-text font-manrope">
            Testimonials & Endorsements
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-luxury-card border border-luxury-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.015)] flex flex-col justify-between items-center text-center"
            >
              {/* Double Quote Icon */}
              <div className="text-luxury-accent/20 mb-6">
                <svg className="w-10 h-10 fill-current mx-auto" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="text-base md:text-lg text-luxury-text/80 leading-relaxed font-semibold mb-6 max-w-2xl italic">
                "{testimonials[index]?.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-luxury-accent fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Author Info */}
              <div>
                <h4 className="text-sm font-bold text-luxury-text font-manrope">
                  {testimonials[index]?.author}
                </h4>
                <p className="text-xs text-luxury-muted mt-0.5 font-semibold">
                  {testimonials[index]?.role} {testimonials[index]?.company ? `@ ${testimonials[index].company}` : ""}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === i ? "bg-luxury-accent w-6" : "bg-luxury-border"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
