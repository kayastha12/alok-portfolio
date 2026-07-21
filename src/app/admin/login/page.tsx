"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#020405] flex items-center justify-center relative overflow-hidden px-6">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-radial from-[#06B6D4]/20 via-[#06B6D4]/3 to-transparent blur-[80px] rounded-full z-0" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-radial from-purple-900/10 via-transparent to-transparent blur-[80px] rounded-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#081013]/40 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] rounded-2xl p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="text-2xl font-black text-white font-manrope tracking-wider">
            Alok <span className="text-[#06B6D4]">S.</span>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-2 font-bold tracking-widest uppercase">
            Admin CMS Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-white uppercase tracking-wider block mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@alok.com"
              required
              className="w-full p-4 rounded-xl bg-[#020405] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#06B6D4]/40 transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-white uppercase tracking-wider block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full p-4 rounded-xl bg-[#020405] border border-[rgba(255,255,255,0.06)] text-white text-sm outline-none focus:border-[#06B6D4]/40 transition-colors"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-red-400 font-bold bg-red-950/20 border border-red-900/30 p-3.5 rounded-xl text-center"
            >
              ⚠️ {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-[#06B6D4]/15 transition-all flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
