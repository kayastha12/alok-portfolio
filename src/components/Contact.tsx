"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#090414] to-[#2a1248]" />

      {/* Stars */}
      <div className="absolute inset-0 -z-10">
        <div className="stars"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-20 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[180px] -z-10" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[250px] -z-10" />

      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[180px] -z-10" />

      {/* Floating Dots */}
      <div className="absolute top-40 left-20 w-3 h-3 rounded-full bg-cyan-400 blur-sm animate-pulse"></div>

      <div className="absolute top-60 right-40 w-4 h-4 rounded-full bg-purple-500 blur-sm animate-pulse"></div>

      <div className="absolute bottom-40 left-1/3 w-3 h-3 rounded-full bg-cyan-400 blur-sm animate-pulse"></div>

      <div className="max-w-7xl w-full">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-bold mb-20"
        >
          Get In{" "}
          <span className="bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold mb-6">
              Let's Work Together 🚀
            </h3>

            <p className="text-gray-400 leading-8 mb-10">
              Interested in AI, Data Analytics, Web Development,
              Flutter projects or collaboration opportunities?
              Feel free to contact me.
            </p>

            <div className="space-y-5">
              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                <h4 className="text-cyan-400 font-semibold">Email</h4>
                <p className="text-gray-300">
                  aloksrivastav489@gmail.com
                </p>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                <h4 className="text-cyan-400 font-semibold">Location</h4>
                <p className="text-gray-300">
                  Mirzapur, Uttar Pradesh
                </p>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                <h4 className="text-cyan-400 font-semibold">Availability</h4>
                <p className="text-gray-300">
                  Open for Internship
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-5"
          >
            <a
              href="mailto:aloksrivastav489@gmail.com"
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-400 transition"
            >
              <h4 className="text-cyan-400 text-xl font-bold mb-2">
                📧 Email
              </h4>
              <p className="text-gray-300">
                aloksrivastav489@gmail.com
              </p>
            </a>

            <a
              href="https://www.linkedin.com/in/alok-srivastav-03b17a33b"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-400 transition"
            >
              <h4 className="text-cyan-400 text-xl font-bold mb-2">
                💼 LinkedIn
              </h4>
              <p className="text-gray-300">
                Connect Professionally
              </p>
            </a>

            <a
              href="https://www.instagram.com/alok_sr07?igsh=bHhxOGp1N2FjMm15"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-400 transition"
            >
              <h4 className="text-cyan-400 text-xl font-bold mb-2">
                📸 Instagram
              </h4>
              <p className="text-gray-300">
                Follow My Journey
              </p>
            </a>

            <a
              href="https://wa.me/9151519662"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-400 transition"
            >
              <h4 className="text-cyan-400 text-xl font-bold mb-2">
                💬 WhatsApp
              </h4>
              <p className="text-gray-300">
                Chat Directly
              </p>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-500">
          © 2026 Alok Srivastav • AI & Data Developer
        </div>
      </div>
    </section>
  );
}

