import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// To match all request paths except for the ones starting with:

// api (API routes)
// _next/static (static files)
// favicon.ico (favicon file)
// coming soon

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|coming-soon).*)"],
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  let response: NextResponse;
  try {
    //middleware #1
    // edge config is accessible in edge runtime
    const IS_MAINTENANCE = await get("featureFlags_isMaintenance");
    if (IS_MAINTENANCE) {
      // redirect
      response = NextResponse.redirect(new URL("/coming-soon", request.url));
      // terminate chain
      return response;
    }

    //middleware #2
    // continue as usual, as if there is no middleware
    response = NextResponse.next();
    // process.env is accessible in edge runtime
    response.cookies.set("MIDDLEWARE_COOKIE", process.env.MY_TEST_VARIABLE);
    return response;
  } catch (error) {
    console.error(error);
    // continue as usual, as if there is no middleware
    response = NextResponse.next();
    return response;
  }
}

// middleware allows you to:

// redirect the incoming request to a different URL
// rewrite the response by displaying a given URL
// Set request headers for API Routes, getServerSideProps, and rewrite destinations
// Set response cookies
// Set response headers
