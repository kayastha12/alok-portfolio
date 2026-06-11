"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function About() {
  return (
    <section
  id="about"
  className="relative min-h-screen flex items-center justify-center px-6 py-24 -mt-20 overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>

        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />

        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-violet-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Floating Dots */}
      <div className="absolute top-32 left-24 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse z-10" />

      <div className="absolute bottom-40 right-32 w-4 h-4 bg-purple-500 rounded-full blur-sm animate-pulse z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="w-80 h-80 rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-400 p-1 shadow-[0_0_80px_rgba(139,92,246,0.5)]"
          >
           <div className="w-full h-full rounded-full overflow-hidden bg-black">
  <Image
    src="/profile.jpg"
    alt="Alok"
    width={500}
    height={500}
    className="w-full h-full object-cover"
  />
</div>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <p className="text-gray-300 text-lg leading-8">
            I'm Alok Srivastav, a MCA student passionate about
            Artificial Intelligence, Data Analytics, Software Development,
            and modern web technologies.
          </p>

          <p className="text-gray-400 mt-6 leading-8">
            I build AI-powered applications, data-driven solutions,
            interactive web experiences, and continuously explore
            cutting-edge technologies to solve real-world problems.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 text-center"
            >
              <h3 className="text-3xl font-bold text-cyan-400">5+</h3>
              <p className="text-gray-400 text-sm">Projects</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 text-center"
            >
              <h3 className="text-3xl font-bold text-purple-400">SW / AI</h3>
              <p className="text-gray-400 text-sm">Developer</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 text-center"
            >
              <h3 className="text-3xl font-bold text-cyan-400">MCA</h3>
              <p className="text-gray-400 text-sm">Student</p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}