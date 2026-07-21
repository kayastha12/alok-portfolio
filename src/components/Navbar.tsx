"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 180;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Scroll Progress Line */}
      <motion.div
        className="h-[2px] bg-luxury-accent origin-left w-full absolute top-0 left-0"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-5 relative">
        <div
          className={`flex items-center justify-between px-8 py-3 rounded-full border transition-all duration-500
            ${
              scrolled
                ? "bg-luxury-card/75 dark:bg-luxury-card/65 border-luxury-border/60 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-xl"
                : "bg-transparent border-transparent"
            }
          `}
        >
          <a
            href="#home"
            className="text-lg font-black text-luxury-text tracking-tight hover:text-luxury-accent transition-colors"
          >
            Alok S.
          </a>

          <ul className="hidden md:flex items-center gap-7 text-[11px] font-bold uppercase tracking-wider">
            {[
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "experience", label: "Journey" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative py-1 transition-colors duration-300 ${
                    activeSection === item.id ? "text-luxury-accent" : "text-luxury-text/60 hover:text-luxury-text"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-luxury-accent rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* AI Toggle Button */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-chatbot"))}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-9 h-9 rounded-xl border border-luxury-border/80 bg-luxury-card/30 flex items-center justify-center text-luxury-text hover:bg-luxury-card hover:border-luxury-accent/30 hover:text-luxury-accent shadow-sm transition-all duration-300 font-extrabold text-xs tracking-wider"
              aria-label="Toggle AI Assistant"
            >
              AI
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-9 h-9 rounded-xl border border-luxury-border/80 bg-luxury-card/30 flex items-center justify-center text-luxury-text hover:bg-luxury-card hover:border-luxury-accent/30 hover:text-luxury-accent shadow-sm transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="hidden sm:flex items-center px-4.5 h-9 rounded-xl border border-luxury-border/80 bg-luxury-card/30 hover:bg-luxury-card hover:border-luxury-accent/30 text-luxury-text font-bold text-xs tracking-wide shadow-sm transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 mr-1.5 stroke-current fill-none text-luxury-muted" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="hidden xs:flex items-center px-4.5 h-9 rounded-xl bg-luxury-accent text-white font-bold text-xs tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(6,182,212,0.15)] hover:bg-luxury-accent-hover hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_6px_16px_rgba(6,182,212,0.22)] transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 mr-1.5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Contact
            </motion.a>

            {/* Mobile Navigation Toggle Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-9 h-9 rounded-xl border border-luxury-border/80 bg-luxury-card/30 flex md:hidden items-center justify-center text-luxury-text hover:bg-luxury-card transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden absolute top-[5.2rem] left-6 right-6 bg-[#030708]/95 dark:bg-[#081013]/95 border border-luxury-border/60 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl flex flex-col gap-3 z-40"
            >
              {[
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Journey" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-luxury-text/90 hover:text-luxury-accent px-3 py-2.5 rounded-xl border-b border-luxury-border/20 transition-all block"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-luxury-accent px-3 py-2.5 rounded-xl border-b border-luxury-border/20 flex items-center gap-2"
              >
                  Download Resume
              </a>
              <a
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-luxury-muted px-3 py-2.5 block"
              >
                 Admin Portal
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}