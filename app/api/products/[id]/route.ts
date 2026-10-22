// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Product from "@/lib/models/Product"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params
    await connectDB()
    const product = await Product.findById(id).populate("category", "name slug").lean()
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ product })
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    await connectDB()
    const body = await request.json()

    const product = await Product.findByIdAndUpdate(id, { $set: body }, { new: true }).populate(
        "category",
        "name slug"
    )
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ product })
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    await connectDB()
    await Product.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
}