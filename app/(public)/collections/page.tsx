// app/(public)/collections/page.tsx
import type { Metadata } from "next"
import { connectDB } from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import { getSettings, s } from "@/lib/getSettings"
import { CollectionsClient } from "@/components/public/CollectionsClient"
import { siteConfig } from "@/lib/data"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings()
    return {
        title: "Collections",
        description: `Browse ${siteConfig.name} full range of handcrafted jewellery.`,
    }
}

export default async function CollectionsPage() {
    const [products, categories, settings] = await Promise.all([
        getProducts(),
        getCategories(),
        getSettings(),
    ])

    return (
        <main className="bg-background text-foreground overflow-hidden">
            <CollectionsClient
                products={products}
                categories={categories}
                currency={siteConfig.currency}
                whatsapp={settings.whatsapp}
            />
        </main>
    )
}

async function getProducts() {
    try {
        await connectDB()
        const products = await Product.find({ visible: true })
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .lean()
        return JSON.parse(JSON.stringify(products))
    } catch {
        return []
    }
}

async function getCategories() {
    try {
        await connectDB()
        const categories = await Category.find().sort({ order: 1, name: 1 }).lean()
        return JSON.parse(JSON.stringify(categories))
    } catch {
        return []
    }
}
