import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookie } from "./app/actions";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  //   hostname => Readex_Pro.local:3000

  // Get cookies
  const accessToken = await getCookie("accessToken");
  const tenantName = await getCookie("tenantName");

  const role = await getCookie("role");

  console.log("acctoken", accessToken);
  console.log("tenantname", tenantName);
  console.log("role", role);

  // Extract subdomain
  const hostnameWithoutPort = hostname.split(":")[0]; // redpro.local or admin.redpro.local or tenant-name.redpro.local
  const parts = hostnameWithoutPort.split(".");

  let subdomain: string | null = null;
  const port = hostname.includes(":") ? ":" + hostname.split(":")[1] : "";

  // Detect subdomain for redpro.local
  // redpro.local = no subdomain (2 parts)
  // admin.redpro.local = admin subdomain (3 parts)
  // tenant-name.redpro.local = tenant subdomain (3 parts)
  if (
    parts.length > 2

    // parts.length > 2 &&
    // parts[parts.length - 1] === "local" &&
    // parts[parts.length - 2] === "redpro"
  ) {
    subdomain = parts.slice(0, -2).join("."); // Handle multi-part subdomains like tenant-name
  }

  // Public paths
  const publicPaths = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/resend-activation-link",
    "/activate",
    "/",
  ];
  const isPublic = publicPaths.some((p) => pathname.includes(p));

  console.log("pub", isPublic, pathname);

  console.log("access", accessToken);

  // If no auth and not public path - redirect to signin
  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL(`http://redpro.local${port}/signin`));
  }

  // If authenticated on root domain (redpro.local) with no subdomain - redirect to subdomain
  if (!subdomain && accessToken) {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL(`http://admin.redpro.local${port}${pathname}`)
      );
    }
    if (role === "user" && tenantName) {
      return NextResponse.redirect(
        new URL(`http://${tenantName}.redpro.local${port}${pathname}`)
      );
    }
  }

  // If on admin subdomain but not admin role - redirect to user's tenant
  if (subdomain === "admin" && role !== "admin" && accessToken) {
    if (tenantName) {
      return NextResponse.redirect(
        new URL(`http://${tenantName}.redpro.local${port}${pathname}`)
      );
    }
  }

  // If on wrong tenant subdomain - redirect to correct tenant
  if (
    subdomain &&
    subdomain !== "admin" &&
    subdomain !== tenantName &&
    accessToken
  ) {
    if (tenantName) {
      return NextResponse.redirect(
        new URL(`http://${tenantName}.redpro.local${port}${pathname}`)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
