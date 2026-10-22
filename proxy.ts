// proxy.ts — Next.js 16+ middleware (renamed from middleware.ts)
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        // Check for Better Auth session cookie
        const sessionCookie =
            request.cookies.get("better-auth.session_token") ??
            request.cookies.get("__Secure-better-auth.session_token")

        if (!sessionCookie) {
            const loginUrl = new URL("/admin/login", request.url)
            loginUrl.searchParams.set("callbackUrl", pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    // Redirect /admin/login to /admin if already authenticated
    if (pathname === "/admin/login") {
        const sessionCookie =
            request.cookies.get("better-auth.session_token") ??
            request.cookies.get("__Secure-better-auth.session_token")

        if (sessionCookie) {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
    }

    return NextResponse.next()
}

export const proxyConfig = {
    matcher: ["/admin/:path*"],
}