import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "db.json");

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session && session.value === "authorized_portfolio_admin";
}

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }
    const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    
    // Do not return passwordHash to public requests
    const { admin, ...publicData } = data;
    
    return NextResponse.json(publicData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const incomingData = await request.json();
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }
    
    const currentDb = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    
    // Maintain credentials when saving other portfolio sections
    const updatedDb = {
      ...currentDb,
      ...incomingData,
      admin: incomingData.admin ? {
        ...currentDb.admin,
        ...incomingData.admin
      } : currentDb.admin
    };
    
    // Write back to DB
    fs.writeFileSync(dbPath, JSON.stringify(updatedDb, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, message: "Content saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
