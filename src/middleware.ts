import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIE_ACCESS, COOKIE_IS_AUTH } from "@/constants";

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get(COOKIE_IS_AUTH)?.value;
  const hasAccess = request.cookies.has(COOKIE_ACCESS);
  if (
    !request.nextUrl.pathname.startsWith("/refresh") &&
    isAuth === "true" &&
    !hasAccess
  ) {
    return NextResponse.redirect(
      new URL(
        `/refresh?path=${request.nextUrl.pathname + request.nextUrl.search}`,
        request.url,
      ),
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
