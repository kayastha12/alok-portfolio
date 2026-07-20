import dbJson from "@/Data/db.json";
import fs from "fs";
import path from "path";

// Helper to check if running in edge/serverless runtime
const isEdge = typeof process === "undefined" || !process.release || process.release.name !== "node";

export async function getPortfolioData() {
  // 1. Try Cloudflare KV binding first
  const kv = (globalThis as any).PORTFOLIO_KV || (process.env as any).PORTFOLIO_KV;
  if (kv) {
    try {
      const data = await kv.get("portfolio_db", { type: "json" });
      if (data) return data;
    } catch (e) {
      console.error("KV read error:", e);
    }
  }

  // 2. Try filesystem read if available
  if (!isEdge) {
    try {
      const dbPath = path.join(process.cwd(), "src", "Data", "db.json");
      if (fs.existsSync(dbPath)) {
        return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      }
    } catch (e) {
      console.error("fs read error:", e);
    }
  }

  // 3. Fall back to statically imported database values
  return dbJson;
}

export async function savePortfolioData(data: any) {
  // 1. Try Cloudflare KV binding first
  const kv = (globalThis as any).PORTFOLIO_KV || (process.env as any).PORTFOLIO_KV;
  if (kv) {
    try {
      await kv.put("portfolio_db", JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("KV write error:", e);
    }
  }

  // 2. Try filesystem write if available
  if (!isEdge) {
    try {
      const dbPath = path.join(process.cwd(), "src", "Data", "db.json");
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
      return true;
    } catch (e) {
      console.error("fs write error:", e);
    }
  }

  return false;
}
