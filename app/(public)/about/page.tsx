// app/(public)/about/page.tsx
import type { Metadata } from "next"
import { getSettings, s } from "@/lib/getSettings"
import { AboutSection } from "@/components/public/AboutSection"
import { PageHeader } from "@/components/public/PageHeader"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings()
    return {
        title: "About",
        description: `The story of ${s(settings.name, "our store")} — craftsmanship and heritage.`,
    }
}

export default async function AboutPage() {
    const settings = await getSettings()
    return (
        <main className="bg-background text-foreground">
            <PageHeader 
                title="Our Story"
                subtitle="Discover the heritage and craftsmanship behind Shammas Jewelry, where tradition meets modern elegance."
            />
            <AboutSection />
        </main>
    )
}
