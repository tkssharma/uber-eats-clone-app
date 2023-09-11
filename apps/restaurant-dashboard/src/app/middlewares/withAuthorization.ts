import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuthorization(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  // requireAuth = ["dashboard"]
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    // IF IT MATCHES WITH ANY OF PRIVATE ROUTE
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (requireAuth.some((path) => pathname.startsWith(path))) {
      // if no token from session, means go to callback or Login
      if (!token) {
        const url = new URL(`/signin`, request.url);
        url.searchParams.set("callbackUrl ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    if (pathname === "/") {
      if (token) {
        const url = new URL(`/dashboard`, request.url);
        return NextResponse.redirect(url);
      } else {
        const url = new URL(`/signin`, request.url);
        return NextResponse.redirect(url);
      }
    }
    // else allow to render //
    return middleware(request, next);
  };
}
