// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Category from "@/lib/models/Category"

export async function GET() {
    await connectDB()
    const categories = await Category.find().sort({ order: 1, name: 1 }).lean()
    return NextResponse.json({ categories })
}

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()
    const { name, slug, order } = await request.json()
    if (!name || !slug) return NextResponse.json({ error: "name and slug required" }, { status: 400 })

    const category = await Category.create({ name, slug, order: order ?? 0 })
    return NextResponse.json({ category }, { status: 201 })
}