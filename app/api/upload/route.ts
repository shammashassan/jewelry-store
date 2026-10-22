// app/api/upload/route.ts
// Handles image uploads → saves to public/uploads/
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

export async function POST(request: NextRequest) {
    // Verify admin session
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const files = formData.getAll("files") as File[]

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 })
        }

        if (files.length > 4) {
            return NextResponse.json({ error: "Max 4 images allowed" }, { status: 400 })
        }

        const uploadDir = path.join(process.cwd(), "public", "uploads")
        await mkdir(uploadDir, { recursive: true })

        const urls: string[] = []

        for (const file of files) {
            // Validate type
            if (!file.type.startsWith("image/")) {
                return NextResponse.json({ error: `${file.name} is not an image` }, { status: 400 })
            }

            // Max 5MB per image
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json({ error: `${file.name} exceeds 5MB limit` }, { status: 400 })
            }

            const ext = path.extname(file.name) || ".jpg"
            const filename = `${randomUUID()}${ext}`
            const buffer = Buffer.from(await file.arrayBuffer())

            await writeFile(path.join(uploadDir, filename), buffer)
            urls.push(`/uploads/${filename}`)
        }

        return NextResponse.json({ urls })
    } catch (err) {
        console.error("Upload error:", err)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}