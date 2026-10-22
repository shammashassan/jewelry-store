// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Product from "@/lib/models/Product"

// GET /api/products — list products (public: only visible; admin: all)
export async function GET(request: NextRequest) {
    await connectDB()
    const { searchParams } = request.nextUrl
    const featuredOnly = searchParams.get("featured") === "true"
    const adminMode = searchParams.get("admin") === "true"

    let filter: Record<string, unknown> = {}
    if (!adminMode) filter.visible = true
    if (featuredOnly) filter.featured = true

    const products = await Product.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .lean()

    return NextResponse.json({ products })
}

// POST /api/products — create product (admin only)
export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()
    const body = await request.json()
    const { name, description, price, category, stock, images, featured, visible, material } = body

    if (!name || !price || !category) {
        return NextResponse.json({ error: "name, price and category are required" }, { status: 400 })
    }

    const product = await Product.create({
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock ?? 0),
        images: images ?? [],
        featured: featured ?? false,
        visible: visible ?? true,
        material: material ?? "Gold",
    })

    return NextResponse.json({ product }, { status: 201 })
}