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
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const parsedData = await getPortfolioData();

    // Return the database as a downloadable file response
    return new NextResponse(JSON.stringify(parsedData, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=portfolio_backup.json",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const backupData = await request.json();
    
    // Quick validation of backup contents
    if (!backupData.admin || !backupData.hero || !backupData.skills || !backupData.projects) {
      return NextResponse.json({ error: "Invalid backup format" }, { status: 400 });
    }
    
    // Overwrite the database
    await savePortfolioData(backupData);
    
    return NextResponse.json({ success: true, message: "Database restored successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
