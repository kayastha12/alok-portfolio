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

  return NextResponse.next();
}

// Intercept all requests under /admin route path
export const config = {
  matcher: ["/admin/:path*"],
};
