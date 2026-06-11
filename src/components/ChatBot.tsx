"use client";

import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([
    {
      text: "👋 Hi! I'm Alok's AI Assistant. Ask me about education, skills, projects, internships or experience.",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");

  const getResponse = (msg: string) => {
    const q = msg.toLowerCase();

    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      return "Hello 👋 How can I help you know more about Alok?";
    }

    if (
      q.includes("who are you") ||
      q.includes("about alok") ||
      q.includes("introduce")
    ) {
      return "Alok Srivastav is an MCA student passionate about AI, Data Analytics, Flutter, Firebase and Software Development.";
    }

    if (
      q.includes("education") ||
      q.includes("college") ||
      q.includes("university")
    ) {
      return "Alok is pursuing MCA from GNIOT under AKTU and completed BCA from Mahatma Gandhi Kashi Vidyapeeth University, Varanasi.";
    }

    if (q.includes("mca")) {
      return "Alok is currently pursuing MCA (2025-2027) from GNIOT under AKTU.";
    }

    if (q.includes("bca")) {
      return "Alok completed BCA from Mahatma Gandhi Kashi Vidyapeeth University.";
    }

    if (
      q.includes("skills") ||
      q.includes("skill") ||
      q.includes("tech stack")
    ) {
      return "Skills: Flutter, Firebase, Dart, Java, C, C++, Python, GitHub, Power BI, FastAPI and Cloud Firestore.";
    }

    if (q.includes("flutter")) {
      return "Alok develops cross-platform mobile applications using Flutter and Firebase.";
    }

    if (
      q.includes("firebase") ||
      q.includes("firestore") ||
      q.includes("authentication")
    ) {
      return "Alok has practical experience with Firebase Authentication and Cloud Firestore.";
    }

    if (
      q.includes("java") ||
      q.includes("python") ||
      q.includes("c++") ||
      q.includes("dart")
    ) {
      return "Alok works with Java, Python, C, C++ and Dart for application development.";
    }

    if (
      q.includes("project") ||
      q.includes("projects")
    ) {
      return "Major projects include AI Desktop Assistant, TPO Placement System, Online Voting System (OVS) and Personal Portfolio.";
    }

    if (
      q.includes("tpo") ||
      q.includes("placement")
    ) {
      return "TPO Placement System is a role-based placement portal built using Flutter and Firebase.";
    }

    if (
      q.includes("ovs") ||
      q.includes("online voting") ||
      q.includes("voting")
    ) {
      return "OVS is a secure Online Voting System with authentication and vote management features.";
    }

    if (
      q.includes("ai desktop assistant") ||
      q.includes("assistant")
    ) {
      return "AI Desktop Assistant uses AI capabilities, automation and voice interactions to improve productivity.";
    }

    if (
      q.includes("internship") ||
      q.includes("hire") ||
      q.includes("job")
    ) {
      return "🚀 Yes, Alok is open to internship and entry-level opportunities in Software Development, Flutter and AI-related roles.";
    }

    if (
      q.includes("certificate") ||
      q.includes("certification")
    ) {
      return "Alok has completed Core Java Certification from Internshala Training.";
    }

    if (
      q.includes("strength") ||
      q.includes("soft skill")
    ) {
      return "Strengths: Quick Learning, Adaptability, Teamwork and Time Management.";
    }

    if (
      q.includes("hobby") ||
      q.includes("interest")
    ) {
      return "Hobbies include Reading Books, Exploring New Technologies and Learning New Software Tools.";
    }

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("linkedin") ||
      q.includes("instagram") ||
      q.includes("whatsapp")
    ) {
      return "You can contact Alok through Email, LinkedIn, Instagram or WhatsApp from the Contact section.";
    }

    return "I can answer questions about Alok's education, MCA, BCA, skills, projects, Flutter, Firebase, internships, certifications and contact information.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user" as const,
    };

    const botMsg = {
      text: getResponse(input),
      sender: "bot" as const,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <button
        id="chatbot-toggle"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.6)] text-2xl"
      >
        Ai
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[500px] bg-[#0b0b0b] border border-white/10 rounded-3xl z-50 flex flex-col overflow-hidden shadow-2xl">

          <div className="p-4 border-b border-white/10 font-bold text-white bg-gradient-to-r from-purple-600/20 to-cyan-400/20">
            Ask AI About Alok
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[85%] ${
                  m.sender === "user"
                    ? "bg-cyan-400 text-black ml-auto"
                    : "bg-white/10 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask something..."
              className="flex-1 p-2 rounded-xl bg-black text-white border border-white/10 outline-none"
            />

            <button
              onClick={sendMessage}
              className="px-4 rounded-xl bg-cyan-400 text-black font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
