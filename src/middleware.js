import { NextResponse } from "next/server";
import { ratelimit } from "./lib/ratelimit"; // Adjust this path based on your folder structure

export async function middleware(request) {
  // Get the client's IP address or fallback to localhost
  const ip = request.ip ?? "127.0.0.1";
  // Check the rate limit for this IP
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  // If the user exceeds the limit, return a 429 Too Many Requests response
  if (!success) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please slow down." }), 
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  // Allow the request to pass through if within limits
  return NextResponse.next();
}

// Config to target specific routes. 
// This ensures your entire frontend pages don't slow down, only your API routes do.
export const config = {
  matcher: "/api/:path*",
};
