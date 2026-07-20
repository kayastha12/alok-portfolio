import dbJson from "@/Data/db.json";
import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

// Helper to check if running in edge/serverless runtime
const isEdge = typeof process === "undefined" || !process.release || process.release.name !== "node";

// Robust resolver to locate Cloudflare KV binding dynamically (bypassing Webpack compile-time static replacement)
function getKVNamespace() {
  const key = "PORTFOLIO_KV";
  const g = globalThis as any;
  const env = (g.process?.env || (typeof process !== "undefined" ? process.env : null) || {}) as any;

  const candidates = [
    g[key],
    env[key],
    g.__cloudflare_env__?.[key],
    g.context?.env?.[key],
    g.env?.[key],
  ];

  for (const candidate of candidates) {
    if (
      candidate && 
      typeof candidate === "object" && 
      typeof candidate.get === "function" && 
      typeof candidate.put === "function"
    ) {
      return candidate;
    }
  }
  return null;
}

// Helper to save database file directly to GitHub via API (triggers Cloudflare auto-rebuild)
async function saveToGitHub(data: any, token: string) {
  const owner = "kayastha12";
  const repo = "alok-portfolio";
  const filePath = "src/Data/db.json";
  
  try {
    // 1. Get current file details to retrieve the SHA hash
    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?t=${Date.now()}`, {
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Alok-Portfolio-CMS",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });
    
    let sha = "";
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }
    
    // 2. Commit the updated db.json file
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Alok-Portfolio-CMS"
      },
      body: JSON.stringify({
        message: "chore: update portfolio content via admin panel",
        content: Buffer.from(JSON.stringify(data, null, 2)).toString("base64"),
        sha: sha || undefined
      })
    });
    
    return commitRes.ok;
  } catch (e) {
    console.error("GitHub commit error:", e);
    return false;
  }
}

export async function getPortfolioData() {
  noStore();
  // 1. Try Cloudflare KV binding first
  const kv = getKVNamespace();
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

export async function savePortfolioData(data: any, clientToken?: string | null) {
  // 1. Try GitHub sync first if clientToken or GITHUB_TOKEN environment variable is set
  const g = globalThis as any;
  const env = (g.process?.env || (typeof process !== "undefined" ? process.env : null) || {}) as any;
  const token = clientToken || env.GITHUB_TOKEN || env.github_token;
  
  if (token) {
    const success = await saveToGitHub(data, token);
    if (success) return true;
  }

  // 2. Try Cloudflare KV binding
  const kv = getKVNamespace();
  if (kv) {
    try {
      await kv.put("portfolio_db", JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("KV write error:", e);
    }
  }

  // 3. Try filesystem write if available (local dev)
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
