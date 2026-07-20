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

  // Inspect OpenNext AsyncLocalStorage Context
  if (g.__openNextAls) {
    report.hasOpenNextAls = true;
    try {
      const store = g.__openNextAls.getStore();
      report.hasStore = typeof store !== "undefined" && store !== null;
      if (store) {
        report.storeKeys = Object.keys(store);
        if (store.env) {
          report.hasStoreEnv = true;
          report.storeEnvKeys = Object.keys(store.env);
          report.hasStoreKV = typeof store.env.PORTFOLIO_KV !== "undefined";
          report.storeKVType = typeof store.env.PORTFOLIO_KV;
        }
      }
    } catch (e: any) {
      report.openNextAlsError = e.message;
    }
  }

  return NextResponse.json(report);
}
