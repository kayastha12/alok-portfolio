import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { getPortfolioData } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Read the db file
    const dbData = await getPortfolioData();
    
    // Hash the input password to check against DB
    const inputHash = crypto.createHash("sha256").update(password).digest("hex");
    
    if (
      email === dbData.admin.email && 
      inputHash === dbData.admin.passwordHash
    ) {
      const cookieStore = await cookies();
      cookieStore.set("admin-session", "authorized_portfolio_admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
