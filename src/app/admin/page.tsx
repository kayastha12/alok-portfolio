"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Tab =
  | "dashboard"
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "statistics"
  | "contact"
  | "resume"
  | "chatbot"
  | "seo"
  | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [githubToken, setGithubToken] = useState("");

  // Load token from browser local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setGithubToken(localStorage.getItem("github_token") || "");
    }
  }, []);

  // Temp states for lists
  const [newSkill, setNewSkill] = useState({ categoryIdx: 0, val: "" });
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [newQA, setNewQA] = useState({ keywords: "", answer: "" });

  // 1. Session check on load
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          setAuthenticated(true);
          fetchContent();
        } else {
          setAuthenticated(false);
          router.push("/admin/login");
        }
      } catch {
        setAuthenticated(false);
        router.push("/admin/login");
      }
    }
    checkSession();
  }, [router]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 2. Fetch content from API
  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio/content");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        showToast("error", "Failed to retrieve portfolio content");
      }
    } catch {
      showToast("error", "Error loading portfolio database");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      showToast("error", "Logout failed");
    }
  };

  // 3. Save portfolio database content
  // 3. Save portfolio database content
  const handleSave = async (updatedData?: any) => {
    const payload = updatedData || data;
    if (!payload) return;
    if (!githubToken) {
      showToast('error', 'GitHub token is required to save changes. Please set it in Global Settings.');
      return;
    }
    setSaveLoading(true);
    try {
      const res = await fetch('/api/portfolio/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-github-token': githubToken,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showToast('success', 'Portfolio content updated successfully');
        router.refresh();
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Save operation failed');
      }
    } catch {
      showToast('error', 'Network error when saving content');
    } finally {
      setSaveLoading(false);
    }
  };

  // 4. File uploads helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, pathPrefix: string = "") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    
    // Force resume files to be named resume.pdf so they overwrite the old one
    const safeName = fieldName === "resume" ? "resume.pdf" : file.name.replace(/\s+/g, "_");
    formData.append("filename", safeName);

    showToast("success", "Uploading file...");

    try {
      const res = await fetch("/api/portfolio/upload", {
        method: "POST",
        headers: {
          "x-github-token": githubToken,
        },
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        // Update corresponding state key
        if (fieldName.startsWith("hero.photo.")) {
          const key = fieldName.split("hero.photo.")[1];
          setData((prev: any) => ({
            ...prev,
            hero: {
              ...prev.hero,
              photo: { ...prev.hero.photo, [key]: json.url }
            }
          }));
        } else if (fieldName.startsWith("about.")) {
          const key = fieldName.split("about.")[1];
          setData((prev: any) => ({
            ...prev,
            about: { ...prev.about, [key]: json.url }
          }));
        } else if (fieldName === "project.image" && editingProject) {
          const projTitle = editingProject.title;
          setEditingProject((prev: any) => ({ ...prev, image: json.url }));
          // Also update the corresponding project in the main data array so the image persists after save
          setData((prev: any) => ({
            ...prev,
            projects: prev.projects.map((proj: any) =>
              proj.title === projTitle ? { ...proj, image: json.url } : proj
            )
          }));
        } else if (fieldName === "resume") {
          showToast("success", "Resume uploaded successfully! Remote build will update the file in a moment.");
        }
        showToast("success", "Upload completed successfully!");
      } else {
        const err = await res.json();
        showToast("error", err.error || "Upload failed");
      }
    } catch {
      showToast("error", "Error uploading asset file");
    }
  };

  // 5. Backups operations
  const handleExportBackup = () => {
    window.open("/api/portfolio/backup", "_blank");
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const res = await fetch("/api/portfolio/backup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(json),
        });

        if (res.ok) {
          showToast("success", "Backup configuration restored successfully!");
          fetchContent();
        } else {
          showToast("error", "Restore failed: Invalid schema format");
        }
      } catch {
        showToast("error", "Invalid file: Could not parse JSON content");
      }
    };
    reader.readAsText(file);
  };

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen w-full bg-[#060C0D] flex items-center justify-center text-white">
        <svg className="animate-spin h-8 w-8 text-[#206F7A]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#060C0D] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Header bar */}
      <header className="h-16 px-4 md:px-8 border-b border-[#142224] bg-[#0F1D20]/50 backdrop-blur-md flex items-center justify-between relative z-50">
        <div className="flex items-center gap-3">
          {/* Sidebar Mobile Toggle Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-10 h-10 rounded-xl border border-[#142224] flex md:hidden items-center justify-center text-[#809699] hover:bg-[#0F1D20]/60 hover:text-white transition-colors"
            aria-label="Toggle Dashboard Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <span className="font-black text-lg tracking-wider">Alok <span className="text-[#206F7A]">S.</span></span>
          <span className="text-[10px] bg-[#206F7A]/20 text-[#206F7A] border border-[#206F7A]/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider hidden xs:inline-block">CMS Panel</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSave()}
            disabled={saveLoading}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#206F7A] hover:bg-[#16535C] font-bold text-xs tracking-wide shadow-lg shadow-[#206F7A]/10 transition-all"
          >
            {saveLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-[#142224] hover:bg-red-950/20 hover:border-red-900/30 text-xs font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main workspace container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 top-16 w-64 border-r border-[#142224] bg-[#0E1A1C] flex flex-col p-6 gap-2 overflow-y-auto z-40
          transition-transform duration-300 md:relative md:top-0 md:translate-x-0 md:bg-[#0F1D20]/20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          {[
            { id: "dashboard", label: "Dashboard", icon: "📊" },
            { id: "hero", label: "Hero Section", icon: "✦" },
            { id: "about", label: "About", icon: "👤" },
            { id: "skills", label: "Skills", icon: "🛡️" },
            { id: "projects", label: "Projects", icon: "🚀" },
            { id: "experience", label: "Journey", icon: "🕒" },
            { id: "statistics", label: "Statistics", icon: "📈" },
            { id: "contact", label: "Contact & Socials", icon: "📞" },
            { id: "resume", label: "Resume Upload", icon: "📄" },
            { id: "chatbot", label: "AI Chatbot", icon: "🤖" },
            { id: "seo", label: "SEO Config", icon: "🔍" },
            { id: "settings", label: "Global Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as Tab);
                setSidebarOpen(false); // auto-close drawer on mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-xs font-bold transition-all ${
                activeTab === item.id
                  ? "bg-[#206F7A] text-white shadow-lg shadow-[#206F7A]/15"
                  : "text-[#809699] hover:bg-[#0F1D20]/60 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* CMS Canvas */}
        <main className="flex-1 p-10 overflow-y-auto bg-[#070D0E]/30 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full mx-auto"
            >

              {/* 1. DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-extrabold font-manrope">Welcome, Alok!</h1>
                    <p className="text-sm text-[#809699] mt-2">Manage all details on your portfolio instantly without touching the codebase.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-[#0F1D20]/40 border border-[#142224] p-6 rounded-3xl">
                      <span className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block">Total Projects</span>
                      <span className="text-4xl font-extrabold mt-2 block font-manrope">{data.projects?.length || 0}</span>
                    </div>
                    <div className="bg-[#0F1D20]/40 border border-[#142224] p-6 rounded-3xl">
                      <span className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block">Timeline Cards</span>
                      <span className="text-4xl font-extrabold mt-2 block font-manrope">{data.experience?.length || 0}</span>
                    </div>
                    <div className="bg-[#0F1D20]/40 border border-[#142224] p-6 rounded-3xl">
                      <span className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block">Chatbot QA Rules</span>
                      <span className="text-4xl font-extrabold mt-2 block font-manrope">{data.chatbot?.length || 0}</span>
                    </div>
                  </div>

                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <h3 className="text-lg font-bold">Quick Configurations Backup</h3>
                    <p className="text-xs text-[#809699]">Export your full content structure as a structured JSON file, or drag-and-drop to restore a backup config instantly.</p>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={handleExportBackup}
                        className="px-5 py-3 bg-[#206F7A]/25 border border-[#206F7A]/40 text-[#206F7A] font-bold text-xs tracking-wide rounded-xl hover:bg-[#206F7A]/40 transition-all"
                      >
                        📥 Export DB (JSON)
                      </button>
                      <label className="px-5 py-3 bg-[#0F1D20] border border-[#142224] text-white font-bold text-xs tracking-wide rounded-xl hover:bg-[#14282B] cursor-pointer transition-all">
                        📤 Restore DB (JSON)
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportBackup}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HERO SECTION */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">Hero Area Settings</h2>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Greeting Title</label>
                        <input
                          type="text"
                          value={data.hero.greeting}
                          onChange={(e) => setData({ ...data, hero: { ...data.hero, greeting: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Primary Name</label>
                        <input
                          type="text"
                          value={data.hero.name}
                          onChange={(e) => setData({ ...data, hero: { ...data.hero, name: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Roles (Comma Separated)</label>
                      <input
                        type="text"
                        value={data.hero.roles.join(", ")}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, roles: e.target.value.split(",").map(r => r.trim()) } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Description Summary</label>
                      <textarea
                        rows={3}
                        value={data.hero.description}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40 resize-none"
                      />
                    </div>

                    {/* Portrait cutout settings */}
                    <div className="border-t border-[#142224] pt-6 space-y-6">
                      <h4 className="text-sm font-bold">Futuristic Portrait Cutout Controls</h4>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Replace Portrait Image (PNG cutout)</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "hero.photo.src")}
                            className="text-xs text-[#809699] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#206F7A] file:text-white hover:file:bg-[#16535C] cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Current Photo Path</label>
                          <input
                            type="text"
                            value={data.hero.photo.src}
                            readOnly
                            className="w-full p-4 rounded-xl bg-[#060C0D]/50 border border-[#142224] text-xs text-[#809699] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Scale (e.g. 1.25)</label>
                          <input
                            type="number"
                            step="0.05"
                            value={data.hero.photo.scale}
                            onChange={(e) => setData({
                              ...data,
                              hero: { ...data.hero, photo: { ...data.hero.photo, scale: parseFloat(e.target.value) } }
                            })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Y Position Offset (px)</label>
                          <input
                            type="number"
                            value={data.hero.photo.positionY}
                            onChange={(e) => setData({
                              ...data,
                              hero: { ...data.hero, photo: { ...data.hero.photo, positionY: parseInt(e.target.value) } }
                            })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Cutout Opacity</label>
                          <input
                            type="number"
                            step="0.01"
                            max="1"
                            value={data.hero.photo.opacity}
                            onChange={(e) => setData({
                              ...data,
                              hero: { ...data.hero, photo: { ...data.hero.photo, opacity: parseFloat(e.target.value) } }
                            })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. ABOUT SECTION */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">About Area Settings</h2>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Badge Text</label>
                      <input
                        type="text"
                        value={data.about.badgeText}
                        onChange={(e) => setData({ ...data, about: { ...data.about, badgeText: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Heading Line</label>
                      <input
                        type="text"
                        value={data.about.heading}
                        onChange={(e) => setData({ ...data, about: { ...data.about, heading: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Paragraph 1</label>
                      <textarea
                        rows={4}
                        value={data.about.paragraph1}
                        onChange={(e) => setData({ ...data, about: { ...data.about, paragraph1: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Paragraph 2</label>
                      <textarea
                        rows={4}
                        value={data.about.paragraph2}
                        onChange={(e) => setData({ ...data, about: { ...data.about, paragraph2: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Highlight Quote Block</label>
                      <textarea
                        rows={2}
                        value={data.about.highlightText}
                        onChange={(e) => setData({ ...data, about: { ...data.about, highlightText: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. SKILLS SECTION */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">Technical Expertise</h2>
                  
                  {data.skills.map((category: any, catIdx: number) => (
                    <div key={catIdx} className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-extrabold text-base text-[#206F7A]">{category.title}</h3>
                        <span className="text-[10px] bg-[#142224] text-[#809699] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Category {catIdx + 1}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Category Title</label>
                          <input
                            type="text"
                            value={category.title}
                            onChange={(e) => {
                              const updated = [...data.skills];
                              updated[catIdx].title = e.target.value;
                              setData({ ...data, skills: updated });
                            }}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Category Description</label>
                          <input
                            type="text"
                            value={category.description}
                            onChange={(e) => {
                              const updated = [...data.skills];
                              updated[catIdx].description = e.target.value;
                              setData({ ...data, skills: updated });
                            }}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Category Icon (Predefined tag or image path)</label>
                          <input
                            type="text"
                            value={category.icon}
                            onChange={(e) => {
                              const updated = [...data.skills];
                              updated[catIdx].icon = e.target.value;
                              setData({ ...data, skills: updated });
                            }}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                            placeholder="AI, Analytics, Mobile, Database, Tools, or path to uploaded icon"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Upload Custom Skill Icon</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append("file", file);
                              formData.append("filename", `skill_icon_${catIdx}_${file.name.replace(/\s+/g, "_")}`);
                              try {
                                const res = await fetch("/api/portfolio/upload", { method: "POST", body: formData });
                                if (res.ok) {
                                  const json = await res.json();
                                  const updated = [...data.skills];
                                  updated[catIdx].icon = json.url;
                                  setData({ ...data, skills: updated });
                                  showToast("success", "Custom skill icon uploaded! Remember to save changes.");
                                }
                              } catch {
                                showToast("error", "Error uploading skill icon");
                              }
                            }}
                            className="text-xs text-[#809699] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#206F7A] file:text-white hover:file:bg-[#16535C] cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Pill tags list */}
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Skills pill tags</label>
                        <div className="flex flex-wrap gap-2.5 mb-4">
                          {category.skills.map((skill: string, skillIdx: number) => (
                            <div
                              key={skillIdx}
                              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060C0D] border border-[#142224] text-xs font-bold"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...data.skills];
                                  updated[catIdx].skills.splice(skillIdx, 1);
                                  setData({ ...data, skills: updated });
                                }}
                                className="text-red-400 hover:text-red-500 font-bold ml-1"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add inline skill */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add tag (e.g. PyTorch)"
                            onChange={(e) => setNewSkill({ categoryIdx: catIdx, val: e.target.value })}
                            value={newSkill.categoryIdx === catIdx ? newSkill.val : ""}
                            className="px-4 py-2.5 rounded-xl bg-[#060C0D] border border-[#142224] text-xs text-white outline-none focus:border-[#206F7A]/40"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!newSkill.val.trim()) return;
                              const updated = [...data.skills];
                              updated[catIdx].skills.push(newSkill.val.trim());
                              setData({ ...data, skills: updated });
                              setNewSkill({ categoryIdx: 0, val: "" });
                            }}
                            className="px-4 py-2.5 rounded-xl bg-[#206F7A] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#16535C]"
                          >
                            Add tag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. PROJECTS SECTION */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold font-manrope">Projects List</h2>
                    <button
                      onClick={() => setEditingProject({
                        title: "New Project Title",
                        description: "Short description summary",
                        longDescription: "Detailed case study description goes here...",
                        tech: ["React"],
                        features: ["Feature bullet item 1"],
                        demoUrl: "#contact",
                        githubUrl: "https://github.com",
                        image: "",
                        category: "Mobile App",
                        featured: true,
                        order: data.projects.length + 1,
                        buttonText: "View Details"
                      })}
                      className="px-4 py-2.5 bg-[#206F7A] text-white font-bold text-xs tracking-wide rounded-xl hover:bg-[#16535C]"
                    >
                      + Create Project
                    </button>
                  </div>

                  {/* List View */}
                  {!editingProject ? (
                    <div className="grid gap-4">
                      {data.projects.map((proj: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-[#0F1D20]/40 border border-[#142224] p-6 rounded-3xl flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-extrabold text-base">{proj.title}</h3>
                            <p className="text-xs text-[#809699] mt-1">{proj.category} • {proj.tech.join(", ")}</p>
                          </div>
                          
                          <div className="flex gap-3">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="px-4 py-2 rounded-xl bg-purple-950/20 border border-purple-900/30 text-purple-400 font-bold text-xs hover:bg-purple-900/40 transition-colors"
                            >
                              Edit details
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                                  const updated = data.projects.filter((_: any, pIdx: number) => pIdx !== idx);
                                  setData({ ...data, projects: updated });
                                  showToast("success", "Project deleted. Hit Save!");
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 font-bold text-xs hover:bg-red-900/40 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Edit Overlay Form
                    <div className="bg-[#0F1D20]/50 border border-[#142224] p-8 rounded-[2.5rem] space-y-6">
                      <div className="flex justify-between items-center border-b border-[#142224] pb-4">
                        <h3 className="font-extrabold text-lg text-[#206F7A]">Project Editor Form</h3>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="text-[#809699] hover:text-white font-bold text-xs"
                        >
                          Cancel / Back
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Project Title</label>
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Category Classification</label>
                          <input
                            type="text"
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Short Description</label>
                        <input
                          type="text"
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Long Case Study Description</label>
                        <textarea
                          rows={4}
                          value={editingProject.longDescription}
                          onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">GitHub Repository URL</label>
                          <input
                            type="text"
                            value={editingProject.githubUrl}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Live Demo URL</label>
                          <input
                            type="text"
                            value={editingProject.demoUrl}
                            onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Upload Project Thumbnail Image</label>
                          <div className="flex flex-col gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, "project.image")}
                              className="text-xs text-[#809699] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#206F7A] file:text-white hover:file:bg-[#16535C] cursor-pointer"
                            />
                            {editingProject.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProject((prev: any) => ({ ...prev, image: "" }));
                                }}
                                className="w-fit px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/40 text-red-400 text-xs font-bold hover:bg-red-900/30 transition-colors"
                              >
                                Remove Photo
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Project Image Path / URL</label>
                          <input
                            type="text"
                            value={editingProject.image || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                            placeholder="/my-project.jpg (optional)"
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                      </div>

                      {/* Tech strings list */}
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Tech stack (Comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.tech.join(", ")}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            tech: e.target.value.split(",").map(t => t.trim())
                          })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>

                      {/* Features lists */}
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Features (One per line)</label>
                        <textarea
                          rows={3}
                          value={editingProject.features.join("\n")}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            features: e.target.value.split("\n").map(f => f.trim()).filter(Boolean)
                          })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none resize-none"
                        />
                      </div>

                      {/* Submit project save */}
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            let updated = [...data.projects];
                            // Check if editing existing or adding new
                            const existsIdx = data.projects.findIndex((p: any) => p.title === editingProject.title);
                            if (existsIdx !== -1) {
                              updated[existsIdx] = editingProject;
                            } else {
                              updated.push(editingProject);
                            }
                            setData({ ...data, projects: updated });
                            setEditingProject(null);
                            showToast("success", "Project list updated. Hit Save!");
                          }}
                          className="px-6 py-3 bg-[#206F7A] text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#16535C]"
                        >
                          Confirm update
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-6 py-3 border border-[#142224] text-[#809699] font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#14282B]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 6. EXPERIENCE TIMELINE */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold font-manrope">Journey Timeline</h2>
                    <button
                      onClick={() => setEditingExperience({
                        year: "2026",
                        title: "Milestone Journey Title",
                        desc: "Short explanation description details..."
                      })}
                      className="px-4 py-2.5 bg-[#206F7A] text-white font-bold text-xs tracking-wide rounded-xl hover:bg-[#16535C]"
                    >
                      + Add Journey Card
                    </button>
                  </div>

                  {!editingExperience ? (
                    <div className="grid gap-4">
                      {data.experience.map((exp: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-[#0F1D20]/40 border border-[#142224] p-6 rounded-3xl flex justify-between items-center"
                        >
                          <div>
                            <span className="text-xs font-bold text-[#206F7A] uppercase tracking-wider">{exp.year}</span>
                            <h3 className="font-extrabold text-base mt-1">{exp.title}</h3>
                          </div>
                          
                          <div className="flex gap-3">
                            <button
                              onClick={() => setEditingExperience(exp)}
                              className="px-4 py-2 rounded-xl bg-purple-950/20 border border-purple-900/30 text-purple-400 font-bold text-xs hover:bg-purple-900/40"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete this journey item?`)) {
                                  const updated = data.experience.filter((_: any, eIdx: number) => eIdx !== idx);
                                  setData({ ...data, experience: updated });
                                  showToast("success", "Journey card deleted. Hit Save!");
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 font-bold text-xs hover:bg-red-900/40"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#0F1D20]/50 border border-[#142224] p-8 rounded-[2.5rem] space-y-6">
                      <div className="flex justify-between items-center border-b border-[#142224] pb-4">
                        <h3 className="font-extrabold text-lg text-[#206F7A]">Timeline Card Editor</h3>
                        <button
                          onClick={() => setEditingExperience(null)}
                          className="text-[#809699] hover:text-white font-bold text-xs"
                        >
                          Cancel / Back
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-1">
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Year</label>
                          <input
                            type="text"
                            value={editingExperience.year}
                            onChange={(e) => setEditingExperience({ ...editingExperience, year: e.target.value })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Journey Title</label>
                          <input
                            type="text"
                            value={editingExperience.title}
                            onChange={(e) => setEditingExperience({ ...editingExperience, title: e.target.value })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Timeline Description</label>
                        <textarea
                          rows={3}
                          value={editingExperience.desc}
                          onChange={(e) => setEditingExperience({ ...editingExperience, desc: e.target.value })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none resize-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            let updated = [...data.experience];
                            const existsIdx = data.experience.findIndex((e: any) => e.title === editingExperience.title);
                            if (existsIdx !== -1) {
                              updated[existsIdx] = editingExperience;
                            } else {
                              updated.push(editingExperience);
                            }
                            setData({ ...data, experience: updated });
                            setEditingExperience(null);
                            showToast("success", "Timeline layout updated. Hit Save!");
                          }}
                          className="px-6 py-3 bg-[#206F7A] text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#16535C]"
                        >
                          Save Journey
                        </button>
                        <button
                          onClick={() => setEditingExperience(null)}
                          className="px-6 py-3 border border-[#142224] text-[#809699] font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#14282B]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 7. STATISTICS SECTION */}
              {activeTab === "statistics" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">Statistics Counter</h2>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <p className="text-xs text-[#809699]">Configure the counts to be displayed. Values accept strings (e.g. "10+").</p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Projects Completed</label>
                        <input
                          type="text"
                          value={data.stats.projects}
                          onChange={(e) => setData({ ...data, stats: { ...data.stats, projects: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Years of Experience</label>
                        <input
                          type="text"
                          value={data.stats.experience}
                          onChange={(e) => setData({ ...data, stats: { ...data.stats, experience: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Dashboards Built</label>
                        <input
                          type="text"
                          value={data.stats.dashboards}
                          onChange={(e) => setData({ ...data, stats: { ...data.stats, dashboards: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Awards/Certificates</label>
                        <input
                          type="text"
                          value={data.stats.certifications}
                          onChange={(e) => setData({ ...data, stats: { ...data.stats, certifications: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. CONTACT & SOCIALS */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">Contact & Social Links</h2>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Email Address</label>
                        <input
                          type="email"
                          value={data.contact.email}
                          onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Contact Phone</label>
                        <input
                          type="text"
                          value={data.contact.phone}
                          onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Location Address</label>
                        <input
                          type="text"
                          value={data.contact.location}
                          onChange={(e) => setData({ ...data, contact: { ...data.contact, location: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Job Availability Status</label>
                        <input
                          type="text"
                          value={data.contact.availability}
                          onChange={(e) => setData({ ...data, contact: { ...data.contact, availability: e.target.value } })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="border-t border-[#142224] pt-6 space-y-6">
                      <h4 className="text-sm font-bold">Social Media Profiles</h4>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">LinkedIn URL</label>
                          <input
                            type="text"
                            value={data.contact.linkedin}
                            onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-xs text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">GitHub URL</label>
                          <input
                            type="text"
                            value={data.contact.github}
                            onChange={(e) => setData({ ...data, contact: { ...data.contact, github: e.target.value } })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-xs text-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">WhatsApp Number (e.g. 9151519662)</label>
                          <input
                            type="text"
                            value={data.contact.whatsapp}
                            onChange={(e) => setData({ ...data, contact: { ...data.contact, whatsapp: e.target.value } })}
                            className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. RESUME PDF UPLOAD */}
              {activeTab === "resume" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">Resume Management</h2>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <p className="text-xs text-[#809699]">Upload a new version of your PDF Resume file. This will automatically overwrite `public/resume.pdf` used by the homepage buttons.</p>
                    
                    <div className="p-8 border-2 border-dashed border-[#142224] hover:border-[#206F7A]/40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors bg-[#060C0D]/50 relative">
                      <svg className="w-10 h-10 text-[#809699]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      
                      <span className="text-xs text-[#809699] font-bold">Select PDF File</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "resume")}
                        className="text-xs text-[#809699] file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#206F7A] file:text-white cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 10. AI CHATBOT DATA */}
              {activeTab === "chatbot" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold font-manrope">AI Assistant QA Set</h2>
                    <button
                      onClick={() => {
                        if (!newQA.keywords || !newQA.answer) {
                          showToast("error", "Keywords and answers are required!");
                          return;
                        }
                        const updated = [...data.chatbot, {
                          keywords: newQA.keywords.split(",").map(k => k.trim()),
                          answer: newQA.answer
                        }];
                        setData({ ...data, chatbot: updated });
                        setNewQA({ keywords: "", answer: "" });
                        showToast("success", "QA Rule added. Hit Save!");
                      }}
                      className="px-4 py-2.5 bg-[#206F7A] text-white font-bold text-xs tracking-wide rounded-xl hover:bg-[#16535C]"
                    >
                      + Add QA Rule
                    </button>
                  </div>

                  {/* Add rule inline form */}
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-[#809699] uppercase tracking-wider">Create New Rule Card</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Keywords (e.g. GPA, grades, marks)"
                        value={newQA.keywords}
                        onChange={(e) => setNewQA({ ...newQA, keywords: e.target.value })}
                        className="p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-xs text-white outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Answer response string"
                        value={newQA.answer}
                        onChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                        className="p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* List of QAs */}
                  <div className="space-y-4">
                    {data.chatbot.map((qa: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-[#0F1D20]/20 border border-[#142224] p-6 rounded-2xl space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex flex-wrap gap-1.5">
                            {qa.keywords.map((kw: string, kwIdx: number) => (
                              <span key={kwIdx} className="text-[10px] font-bold text-[#206F7A] border border-[#206F7A]/30 bg-[#206F7A]/10 px-2 py-0.5 rounded-full">{kw}</span>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => {
                              const updated = data.chatbot.filter((_: any, qIdx: number) => qIdx !== idx);
                              setData({ ...data, chatbot: updated });
                              showToast("success", "QA Rule deleted. Hit Save!");
                            }}
                            className="text-red-400 hover:text-red-500 font-bold text-xs"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed bg-[#060C0D]/40 p-4 rounded-xl border border-[#142224]/50">{qa.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. SEO CONFIG */}
              {activeTab === "seo" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-manrope">SEO Page Settings</h2>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Browser Title Header</label>
                      <input
                        type="text"
                        value={data.seo.title}
                        onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Meta Description</label>
                      <textarea
                        rows={3}
                        value={data.seo.description}
                        onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">SEO Keywords (Comma Separated)</label>
                      <input
                        type="text"
                        value={data.seo.keywords.join(", ")}
                        onChange={(e) => setData({
                          ...data,
                          seo: { ...data.seo, keywords: e.target.value.split(",").map(k => k.trim()) }
                        })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Google Analytics Tracking ID (e.g. G-XXXXXXX)</label>
                      <input
                        type="text"
                        value={data.seo.googleAnalytics}
                        onChange={(e) => setData({ ...data, seo: { ...data.seo, googleAnalytics: e.target.value } })}
                        className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 12. GLOBAL SETTINGS & THEMES */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold font-manrope">Global Styles Configuration</h2>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (confirm("Reset theme settings to original default values?")) {
                            setData((prev: any) => ({
                              ...prev,
                              settings: {
                                primaryColor: "#060C0D",
                                accentColor: "#206F7A",
                                accentHoverColor: "#16535C",
                                fonts: {
                                  heading: "Manrope",
                                  body: "Inter"
                                },
                                animationSpeed: 0.5,
                                glowsEnabled: true,
                                particlesEnabled: true
                              }
                            }));
                            showToast("success", "Theme reset to default values. Hit Save Changes to apply!");
                          }
                        }}
                        className="px-4 py-2 bg-yellow-950/20 border border-yellow-900/30 text-yellow-500 font-bold text-xs hover:bg-yellow-900/40 rounded-xl transition-all"
                      >
                        Reset to Defaults
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Discard all unsaved edits on style settings?")) {
                            fetchContent();
                            showToast("success", "Unsaved changes discarded.");
                          }
                        }}
                        className="px-4 py-2 border border-[#142224] hover:bg-[#14282B] text-xs font-bold rounded-xl transition-all"
                      >
                        Undo Unsaved Edits
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F1D20]/40 border border-[#142224] p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Primary Color Hex</label>
                        <input
                          type="color"
                          value={data.settings.primaryColor}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, primaryColor: e.target.value }
                          })}
                          className="w-full h-12 bg-transparent border-0 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Teal Accent Hex</label>
                        <input
                          type="color"
                          value={data.settings.accentColor}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, accentColor: e.target.value }
                          })}
                          className="w-full h-12 bg-transparent border-0 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Accent Hover Hex</label>
                        <input
                          type="color"
                          value={data.settings.accentHoverColor}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, accentHoverColor: e.target.value }
                          })}
                          className="w-full h-12 bg-transparent border-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Heading Font Families</label>
                        <input
                          type="text"
                          value={data.settings.fonts.heading}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, fonts: { ...data.settings.fonts, heading: e.target.value } }
                          })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">Body Font Families</label>
                        <input
                          type="text"
                          value={data.settings.fonts.body}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, fonts: { ...data.settings.fonts, body: e.target.value } }
                          })}
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 border-t border-[#142224] pt-6">
                      <div className="flex items-center justify-between p-4 bg-[#060C0D] border border-[#142224] rounded-2xl">
                        <span className="text-xs font-bold">Particles Overlay Background</span>
                        <input
                          type="checkbox"
                          checked={data.settings.particlesEnabled}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, particlesEnabled: e.target.checked }
                          })}
                          className="w-4 h-4 accent-[#206F7A]"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#060C0D] border border-[#142224] rounded-2xl">
                        <span className="text-xs font-bold">Ambient Glow Blobs background</span>
                        <input
                          type="checkbox"
                          checked={data.settings.glowsEnabled}
                          onChange={(e) => setData({
                            ...data,
                            settings: { ...data.settings, glowsEnabled: e.target.checked }
                          })}
                          className="w-4 h-4 accent-[#206F7A]"
                        />
                      </div>
                    </div>

                    <div className="border-t border-[#142224] pt-6 space-y-4">
                      <h4 className="text-xs font-bold text-[#809699] uppercase tracking-wider">GitHub Sync Configuration</h4>
                      <p className="text-[10px] text-[#809699]/70 leading-relaxed font-semibold">
                        Enter your GitHub Personal Access Token (PAT) with `repo` permissions to commit changes back to your repository on Cloudflare. 
                        It is saved securely in your browser's LocalStorage and never committed to code.
                      </p>
                      <div>
                        <label className="text-[10px] font-bold text-[#809699] uppercase tracking-wider block mb-2">GitHub Personal Access Token (PAT)</label>
                        <input
                          type="password"
                          value={githubToken}
                          onChange={(e) => {
                            setGithubToken(e.target.value);
                            localStorage.setItem("github_token", e.target.value);
                          }}
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="w-full p-4 rounded-xl bg-[#060C0D] border border-[#142224] text-sm text-white outline-none focus:border-[#206F7A]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      {/* Toast Feedback Messages */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl font-bold text-xs shadow-2xl border ${
              toast.type === "success"
                ? "bg-[#0F1D20]/90 text-white border-[#206F7A]/40"
                : "bg-red-950/90 text-red-300 border-red-900/40"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
