"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex items-center justify-between px-8 py-4 rounded-full backdrop-blur-xl bg-black/20 border border-white/10">

          <a
            href="#home"
            className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
          >
            AS
          </a>

          <ul className="hidden md:flex items-center gap-8 text-white">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold"
          >
            Hire Me
          </a>

        </div>
      </div>
    </nav>
  );
}