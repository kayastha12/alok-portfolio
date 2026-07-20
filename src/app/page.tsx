import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WhyChoose from "@/components/WhyChoose";
import FocusAreas from "@/components/FocusAreas";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const dbPath = path.join(process.cwd(), "src", "data", "db.json");
  let portfolioData: any = {};
  
  try {
    if (fs.existsSync(dbPath)) {
      portfolioData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    }
  } catch (error) {
    console.error("Error reading portfolio database:", error);
  }

  return (
    <main className="bg-luxury-bg min-h-screen">
      <Navbar />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Skills data={portfolioData.skills} />
      <WhyChoose data={portfolioData.whyChoose} />
      <FocusAreas />
      <Projects data={portfolioData.projects} />
      <Experience data={portfolioData.experience} />
      <Testimonials data={portfolioData.testimonials} />
      <Contact data={portfolioData.contact} />
      <Footer data={portfolioData.contact} />
      <ChatBot data={portfolioData.chatbot} />
    </main>
  );
}