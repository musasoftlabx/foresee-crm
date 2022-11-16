import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const verify = request.cookies.get("__aT");
  //&& request.url.includes("/")
  if (!verify) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  //matcher: ["/((?!login).*)"], //'/((?!api|_next/static|favicon.ico).*)',
  matcher: ["/", "/users"],
};
