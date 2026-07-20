import { NextResponse } from "next/server";

export async function GET() {
  const g = globalThis as any;
  const envKeys = typeof process !== "undefined" && process.env ? Object.keys(process.env) : [];
  
  // Safe scan of global keys
  const globalKeys = Object.keys(g).filter(k => k !== "global" && k !== "globalThis");

  // Check where PORTFOLIO_KV resides
  const report: any = {
    hasGlobalKV: typeof g.PORTFOLIO_KV !== "undefined",
    globalKVType: typeof g.PORTFOLIO_KV,
    hasProcessEnvKV: typeof process !== "undefined" && typeof process.env?.PORTFOLIO_KV !== "undefined",
    processEnvKVType: typeof process !== "undefined" ? typeof process.env?.PORTFOLIO_KV : "undefined",
    envKeys,
    globalKeys,
    isEdge: typeof process === "undefined" || !process.release || process.release.name !== "node",
  };

  // Try checking special next-on-pages context key
  if (g.__cloudflare_env__) {
    report.hasCloudflareEnv = true;
    report.cloudflareEnvKeys = Object.keys(g.__cloudflare_env__);
    report.hasCloudflareKV = typeof g.__cloudflare_env__.PORTFOLIO_KV !== "undefined";
    report.cloudflareKVType = typeof g.__cloudflare_env__.PORTFOLIO_KV;
  }

  return NextResponse.json(report);
}
