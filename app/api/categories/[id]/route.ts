// app/api/categories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import Category from "@/lib/models/Category"

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    await connectDB()
    const body = await request.json()
    const category = await Category.findByIdAndUpdate(id, { $set: body }, { new: true })
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ category })
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    await connectDB()
    await Category.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
}