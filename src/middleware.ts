import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin-session");
  const { pathname } = request.nextUrl;

  // Protect /admin page routes (excluding /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session || session.value !== "authorized_portfolio_admin") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent caching of homepage for real-time updates on serverless hosting
  if (pathname === "/") {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  return NextResponse.next();
}

// Intercept homepage and admin route paths
export const config = {
  matcher: ["/", "/admin/:path*"],
};
