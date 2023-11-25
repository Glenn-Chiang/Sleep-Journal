import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      !request.nextauth.token?.admin
    ) {
      return NextResponse.redirect(request.nextUrl.origin);
    }
  },
  {
    pages: {
      signIn: "/login",
      signOut: "/logout",
    },
  }
);
