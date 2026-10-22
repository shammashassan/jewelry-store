// lib/getSettings.ts
// Server-side helper — fetches settings directly from DB (no HTTP round-trip).
// Use this in Server Components. For client components use /api/settings.
import { connectDB } from "@/lib/db"
import SiteSettings, { ISiteSettings } from "@/lib/models/SiteSettings"

const NC = "Not configured" // fallback label

export type Settings = Partial<ISiteSettings> & { _configured?: boolean }

export async function getSettings(): Promise<Settings> {
    try {
        await connectDB()
        const doc = await SiteSettings.findOne().lean()
        if (!doc) return { _configured: false }
        return { ...JSON.parse(JSON.stringify(doc)), _configured: true }
    } catch {
        return { _configured: false }
    }
}

// Safe accessor — returns value or "Not configured"
export function s(value: string | undefined, fallback = NC): string {
    if (!value || value.trim() === "") return fallback
    return value
}