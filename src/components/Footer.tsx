"use client";

import { motion } from "framer-motion";

interface FooterProps {
  data?: {
    location: string;
  };
}

export default function Footer({ data }: FooterProps) {
  const location = data?.location || "Greater Noida, UP, India";

  return (
    <footer className="relative py-16 px-6 overflow-hidden bg-luxury-bg border-t border-luxury-border/60">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between items-center gap-12">
        
        {/* Giant Logo */}
        <div className="w-full text-center">
          <h2 className="text-5xl md:text-[6.5rem] font-black text-luxury-text/5 tracking-tighter select-none font-manrope uppercase">
            Alok Srivastav
          </h2>
        </div>

        {/* Info Grid */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-semibold text-luxury-muted">
          <div>
            <span>📍 {location}</span>
          </div>

          {/* Quick Navigation Footer Links */}
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="#about" className="hover:text-luxury-accent transition-colors duration-300">About</a>
            <a href="#skills" className="hover:text-luxury-accent transition-colors duration-300">Skills</a>
            <a href="#projects" className="hover:text-luxury-accent transition-colors duration-300">Projects</a>
            <a href="#experience" className="hover:text-luxury-accent transition-colors duration-300">Journey</a>
            <a href="#contact" className="hover:text-luxury-accent transition-colors duration-300">Contact</a>
          </div>

          <div className="flex items-center gap-1.5">
            <span>© 2026 Alok S. &bull; Developer</span>
            <span>&bull;</span>
            <a href="/admin" className="hover:text-luxury-accent transition-colors duration-300">Admin Portal</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
