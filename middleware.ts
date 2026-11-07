import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.APP_PASSWORD;
  if (!password) {
    return new NextResponse("App is not configured: set APP_PASSWORD in Vercel environment variables.", { status: 503 });
  }
  const auth = request.headers.get("authorization") || "";
  const expected = "Basic " + btoa("studio:" + password);
  if (auth !== expected) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="VidoGrid Studio", charset="UTF-8"' }
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};