// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Define public routes using route matchers for better performance
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/blog",
  "/blog/(.*)",
  "/contact", 
  "/features",
  "/product",
  "/pricing",
  "/privacy-policy",
  "/terms-of-service",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// ✅ Define protected API routes
const isProtectedApiRoute = createRouteMatcher([
  "/api/protected/(.*)",
  "/api/dashboard/(.*)",
  "/api/user/(.*)",
  "/trpc/(.*)",
]);

// ✅ Define admin routes (optional - for role-based access)
const isAdminRoute = createRouteMatcher([
  "/admin/(.*)",
]);

// ✅ Middleware with proper error handling and logging
export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();
  const path = req.nextUrl.pathname;

  // Log for debugging (remove in production)
  console.log(`[Middleware] ${req.method} ${path} - User: ${userId ? 'authenticated' : 'anonymous'}`);

  // ✅ Allow public routes
  if (isPublicRoute(req)) {
    return;
  }

  // ✅ Protect admin routes with role check
  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
    
    // Check for admin role (adjust based on your role structure)
    const userRole = sessionClaims?.metadata?.role;
    if (userRole !== 'admin') {
      return new Response('Unauthorized', { status: 403 });
    }
    return;
  }

  // ✅ Protect API routes
  if (isProtectedApiRoute(req)) {
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    return;
  }

  // ✅ For all other routes, require authentication
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return Response.redirect(signInUrl);
  }
});

// ✅ Optimized config - more specific matching
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    /*
     * Always run for API routes
     */
    "/(api|trpc)(.*)",
  ],
};