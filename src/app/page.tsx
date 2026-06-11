import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ChatBot from "@/components/ChatBot";
<main className="relative overflow-hidden">
  <div className="hero-bg fixed inset-0 -z-50"></div>
  <div className="stars fixed inset-0 -z-40"></div>

  <Navbar />
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Experience />
  <Contact />
  <ChatBot />
</main>
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About/>
     <Skills />
      <Projects />
      <Experience />
      <Contact />
      <ChatBot />
    </main>
  );
}