import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData, savePortfolioData } from "@/lib/db";

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session && session.value === "authorized_portfolio_admin";
}

export async function GET() {
  try {
    const data = await getPortfolioData();
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
    const currentDb = await getPortfolioData();
    
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
    await savePortfolioData(updatedDb);
    
    return NextResponse.json({ success: true, message: "Content saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
