"use client";

import { useState } from "react";
import { chatbotData } from "@/Data/chatbotData";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([
    {
      text: "👋 Hi! I'm Alok's AI Assistant. Ask me about my education, skills, projects, certifications, internships or contact information.",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");

  const getResponse = (msg: string) => {
    const query = msg.toLowerCase();

    const match = chatbotData.find((item) =>
      item.keywords.some((keyword) =>
        query.includes(keyword.toLowerCase())
      )
    );

    if (match) {
      return match.answer;
    }

    return `I can answer questions about:

🎓 Education
💻 Technical Skills
🚀 Projects
📱 Flutter & Firebase
🏆 Certifications
💼 Internship Opportunities
📞 Contact Information
🎯 Career Goals
📚 Hobbies & Interests

Try asking:
• tell me about yourself
• What are your skills?
• Tell me about TPO Placement System
• What projects have you built?
• How can I contact Alok?
`;
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
      {/* Floating AI Button */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6 z-50
          w-16 h-16 rounded-full
          bg-gradient-to-r
          from-purple-600
          to-cyan-400
          text-white text-2xl
          shadow-[0_0_35px_rgba(139,92,246,0.6)]
          hover:scale-110
          transition-all
        "
      >
        AI
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6
            w-[350px] h-[550px]
            bg-[#0b0b0b]
            border border-white/10
            rounded-3xl
            z-50
            flex flex-col
            overflow-hidden
            shadow-2xl
          "
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-cyan-400/20">
            <h3 className="font-bold text-white text-lg">
              🤖 Ask AI About Alok
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Portfolio Assistant
            </p>
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 pt-3 flex flex-wrap gap-2">
            {[
              "About Alok",
              "Education",
              "Skills",
              "Projects",
              "Internship",
              "Contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setInput(item)}
                className="
                  px-3 py-1
                  rounded-full
                  bg-white/10
                  text-xs
                  text-white
                  hover:bg-cyan-400
                  hover:text-black
                  transition
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line ${
                  m.sender === "user"
                    ? "bg-cyan-400 text-black ml-auto"
                    : "bg-white/10 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask something..."
              className="
                flex-1
                p-3
                rounded-xl
                bg-black
                text-white
                border border-white/10
                outline-none
                focus:border-cyan-400
              "
            />

            <button
              onClick={sendMessage}
              className="
                px-4
                rounded-xl
                bg-cyan-400
                text-black
                font-semibold
                hover:scale-105
                transition
              "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

