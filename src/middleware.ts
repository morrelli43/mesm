import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // For demo purposes, check if there's a mock session in the request headers
    // In a real implementation, you'd validate the actual session token
    const userCookie = request.cookies.get("mock-auth-user");
    
    // If no session token, redirect to login
    if (!userCookie) {
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