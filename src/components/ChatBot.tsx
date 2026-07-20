"use client";

import { useState, useEffect } from "react";
import { chatbotData } from "@/Data/chatbotData";

interface ChatBotItem {
  keywords: string[];
  answer: string;
}

interface ChatBotProps {
  data?: ChatBotItem[];
}

export default function ChatBot({ data }: ChatBotProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

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
    const activeQA = data || chatbotData;

    const match = activeQA.find((item) =>
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
      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-4 right-4 sm:bottom-24 sm:right-6
            w-[350px] h-[550px]
            bg-luxury-card
            border border-luxury-border
            rounded-[2.5rem]
            z-50
            flex flex-col
            overflow-hidden
            shadow-2xl
          "
        >
          {/* Header */}
          <div className="p-5 border-b border-luxury-border/60 bg-luxury-bg flex justify-between items-center">
            <h3 className="font-extrabold text-luxury-text text-base flex items-center gap-1.5 font-manrope">
              <span>🤖</span> Ask AI About Alok
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-luxury-muted hover:text-luxury-text focus:outline-none"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-luxury-muted mt-0.5 font-semibold">
            Portfolio Chatbot Assistant
          </p>

          {/* Quick Suggestions */}
          <div className="px-4 pt-4 flex flex-wrap gap-2">
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
                  px-3.5 py-1.5
                  rounded-full
                  bg-luxury-bg
                  border border-luxury-border
                  text-xs
                  text-luxury-text
                  hover:bg-luxury-accent
                  hover:text-white
                  transition duration-200
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-luxury-accent text-white ml-auto font-medium rounded-tr-none"
                    : "bg-luxury-bg text-luxury-text rounded-tl-none border border-luxury-border/60"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-luxury-border bg-luxury-card">
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
                bg-luxury-input
                text-luxury-text
                text-sm
                border border-luxury-border
                outline-none
                focus:border-luxury-accent/30
              "
            />

            <button
              onClick={sendMessage}
              className="
                px-4
                rounded-xl
                bg-luxury-accent
                text-white
                font-bold
                text-sm
                hover:bg-luxury-accent-hover hover:scale-103
                transition-all duration-200
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
