// app/api/settings/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import SiteSettings from "@/lib/models/SiteSettings"

// GET /api/settings — public, used by all public pages
export async function GET() {
    await connectDB()
    // findOne returns the single settings doc; if none exists return empty object
    const settings = await SiteSettings.findOne().lean()
    return NextResponse.json({ settings: settings ?? {} })
}

// PATCH /api/settings — admin only, upserts the single settings document
export async function PATCH(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()
    const body = await request.json()

    // Upsert — create if doesn't exist, update if does
    const settings = await SiteSettings.findOneAndUpdate(
        {}, // match any (there's only ever one doc)
        { $set: body },
        { new: true, upsert: true }
    )

    return NextResponse.json({ settings })
}