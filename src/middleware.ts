import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Check for Better Auth session cookie
      const sessionCookie = request.cookies.get("better-auth.session_token");
      
      // Check for demo session cookie as fallback
      const demoSessionCookie = request.cookies.get("demo-session");
      
      // If no session cookie, redirect to login
      if (!sessionCookie && !demoSessionCookie) {
        const url = new URL("/login", request.url);
        url.searchParams.set("callbackUrl", request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      
      // Optionally verify the session by making a request to the auth API
      // But for now, just check if the cookie exists
    } catch (error) {
      // If session verification fails, redirect to login
      console.error("Session verification error:", error);
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};