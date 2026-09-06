import { NextRequest, NextResponse } from "next/server";
import { requestHasAdminSession } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/write") && !requestHasAdminSession(request)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (
    pathname.startsWith("/api/admin/") &&
    pathname !== "/api/admin/login" &&
    !requestHasAdminSession(request)
  ) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: ["/admin/write/:path*", "/api/admin/:path*"],
};
