import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin-session");
    
    if (sessionCookie && sessionCookie.value === "authorized_portfolio_admin") {
      return NextResponse.json({ authenticated: true });
    }
    
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}
