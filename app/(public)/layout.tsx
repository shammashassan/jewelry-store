// app/(public)/layout.tsx
import { getSettings } from "@/lib/getSettings"
import { connectDB } from "@/lib/db"
import Category from "@/lib/models/Category"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/public/Navbar"
import { Footer } from "@/components/public/Footer"

async function getCategories() {
    try {
        await connectDB()
        const cats = await Category.find().sort({ order: 1, name: 1 }).lean()
        return JSON.parse(JSON.stringify(cats)) as { _id: string; name: string; slug: string }[]
    } catch {
        return []
    }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const [settings, categories] = await Promise.all([getSettings(), getCategories()])
    return (
        <div className="relative flex flex-col min-h-screen">
            <Navbar settings={settings} />
            <main className="flex-1 relative">
                {children}
            </main>
            <div className="relative z-10 bg-background">
                <Footer settings={settings} categories={categories} />
            </div>
            <Toaster />
        </div>
    )
}