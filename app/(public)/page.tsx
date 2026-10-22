// app/(public)/page.tsx
import { getSettings, s } from "@/lib/getSettings"
import { connectDB } from "@/lib/db"
import Product from "@/lib/models/Product"
import { HeroSection } from "@/components/public/HeroSection"
import { FeaturedProductsSection } from "@/components/public/FeaturedProductsSection"
import { FeaturedCategories } from "@/components/public/FeaturedCategories"
import { WhyChooseUs } from "@/components/public/WhyChooseUs"
import { AboutSection } from "@/components/public/AboutSection"
import { TestimonialsSection } from "@/components/public/TestimonialsSection"
import { InstagramGallery } from "@/components/public/InstagramGallery"
import { FAQMini } from "@/components/public/FAQMini"
import { FinalCTA } from "@/components/public/FinalCTA"
import { siteConfig } from "@/lib/data"

export const revalidate = 60 // ISR — revalidate every 60s

export default async function HomePage() {
    const [settings, bestSellers] = await Promise.all([
        getSettings(),
        getBestSellers(),
    ])

    const currency = siteConfig.currency

    return (
        <>
            <HeroSection />
            <div className="relative z-10 bg-background mt-[100vh]">
                <FeaturedCategories />
                <FeaturedProductsSection products={bestSellers} currency={currency} heading="Best Sellers" />
                <WhyChooseUs />
                <AboutSection />
                <TestimonialsSection />
                <InstagramGallery />
                <FAQMini />
                <FinalCTA settings={settings} />
            </div>
        </>
    )
}

async function getBestSellers() {
    try {
        await connectDB()
        // Here we can use 'featured' as 'Best Sellers' or add a dedicated field
        const products = await Product.find({ featured: true, visible: true })
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .limit(8)
            .lean()
        return products.map(p => ({
            ...p,
            _id: p._id.toString(),
            category: p.category ? {
                ...(p.category as any),
                _id: (p.category as any)._id?.toString()
            } : undefined
        }))
    } catch {
        return []
    }
}
