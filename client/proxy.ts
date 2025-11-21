import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || "redpro.local";

export default function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || ""; // e.g., subdomain.redpro.local:3000, localhost:3000, etc.
  const pathname = req.nextUrl.pathname;

  // Define the main domain (without www or https://)
  const rootDomain = ROOT_DOMAIN;

  // // Only process API proxy requests
  // if (!pathname.startsWith("/api/proxy")) {
  //   return NextResponse.next();
  // }

  // Extract hostname without port
  const hostWithoutPort = hostname.split(":")[0];
  const isMainDomain =
    hostWithoutPort === rootDomain ||
    hostWithoutPort === "localhost" ||
    hostWithoutPort === `www.${rootDomain}`;

  let subdomain = "";

  // Check if this is a subdomain
  if (
    !isMainDomain &&
    hostWithoutPort !== "localhost" &&
    hostWithoutPort.endsWith(`.${rootDomain}`)
  ) {
    subdomain = hostWithoutPort.replace(`.${rootDomain}`, "").split(".")[0]; // Extract subdomain
  }

  // Handle main domain routing - only rewrite the root path
  if (
    (!subdomain || subdomain === "www" || isMainDomain) &&
    url.pathname === "/"
  ) {
    return NextResponse.rewrite(new URL(`/`, req.url));
  }

  // If it's a subdomain, rewrite to the internal /apps/[subdomain] route
  if (subdomain && subdomain !== "www" && !isMainDomain) {
    // Rewrite the request to /apps/[subdomain]/path
    const newUrl = new URL(`/apps/${subdomain}${url.pathname}`, req.url);
    return NextResponse.rewrite(newUrl);
  }

  // For main domain routes (not subdomain), pass through without rewriting
  return NextResponse.next();
}
