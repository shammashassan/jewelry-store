// lib/auth-client.ts — Better Auth client (browser-side)
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

export const { signIn, signOut, useSession, getSession } = authClient