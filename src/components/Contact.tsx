"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ContactProps {
  data?: {
    email: string;
    phone: string;
    location: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    availability: string;
  };
}

export default function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // Safe Fallbacks
  const email = data?.email || "aloksrivastav489@gmail.com";
  const phone = data?.phone || "+91-9151519662";
  const location = data?.location || "Varanasi / Greater Noida, India";
  const whatsapp = data?.whatsapp || "9151519662";
  const linkedin = data?.linkedin || "https://www.linkedin.com/in/alok-srivastav-03b17a33b";
  const github = data?.github || "https://github.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-luxury-bg border-t border-luxury-border/60"
    >
      <div className="max-w-7xl w-full relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-luxury-accent font-bold text-xs tracking-widest uppercase">
            <span>✦</span> Let's Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-luxury-text leading-tight font-manrope">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column (Contact details) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-luxury-card border border-luxury-border/60 rounded-[2.5rem] p-8 shadow-[0_12px_45px_rgba(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-luxury-text mb-6 font-manrope">
                Start a Conversation
              </h3>

              <p className="text-luxury-muted leading-relaxed text-sm md:text-base font-semibold mb-8">
                Have an interesting AI development opportunity, complex data analytics project, 
                or full-time software engineering opening? Send an inquiry and let's construct something together.
              </p>

              <div className="space-y-4">
                <div className="bg-luxury-bg border border-luxury-border/50 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-[10px] font-bold text-luxury-accent tracking-widest uppercase">Email Direct</h4>
                  <p className="text-luxury-text mt-1 text-sm md:text-base font-bold select-all">
                    {email}
                  </p>
                </div>

                <div className="bg-luxury-bg border border-luxury-border/50 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-[10px] font-bold text-luxury-accent tracking-widest uppercase">Base Office</h4>
                  <p className="text-luxury-text mt-1 text-sm md:text-base font-bold">
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="mt-12 pt-6 border-t border-luxury-border flex flex-wrap gap-4">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-luxury-accent hover:text-luxury-accent-hover transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-luxury-border font-light">/</span>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-luxury-accent hover:text-luxury-accent-hover transition-colors"
              >
                GitHub
              </a>
              <span className="text-luxury-border font-light">/</span>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-luxury-accent hover:text-luxury-accent-hover transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right Column (Contact form) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-luxury-card border border-luxury-border/60 rounded-[2.5rem] p-8 shadow-[0_12px_45px_rgba(0,0,0,0.015)] flex flex-col justify-between"
          >
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-xs font-bold text-luxury-text uppercase tracking-wider block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
                    className="w-full p-4 rounded-2xl bg-luxury-input border border-luxury-border text-luxury-text text-sm font-semibold outline-none focus:border-luxury-accent/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-xs font-bold text-luxury-text uppercase tracking-wider block mb-2">
                    Email Address
                  </label>
                  <input
                    type="type"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="john@example.com"
                    className="w-full p-4 rounded-2xl bg-luxury-input border border-luxury-border text-luxury-text text-sm font-semibold outline-none focus:border-luxury-accent/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-bold text-luxury-text uppercase tracking-wider block mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Hi Alok, I'd like to collaborate with you on..."
                    className="w-full p-4 rounded-2xl bg-luxury-input border border-luxury-border text-luxury-text text-sm font-semibold outline-none focus:border-luxury-accent/30 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Trigger */}
              <div className="pt-6 border-t border-luxury-border/60 mt-8 flex justify-between items-center flex-wrap gap-4">
                <span className="text-xs text-luxury-muted font-semibold">
                  {sent ? "✅ Message received! I'll contact you soon." : "We typically reply within 24 hours."}
                </span>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3 rounded-full bg-luxury-accent text-white font-bold text-xs tracking-wide shadow-[0_4px_15px_rgba(36,93,102,0.25)] hover:bg-luxury-accent-hover transition-all duration-300"
                >
                  Send Inquiry
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
