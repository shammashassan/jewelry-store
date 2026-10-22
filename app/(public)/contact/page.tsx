// app/(public)/contact/page.tsx
import type { Metadata } from "next"
import { getSettings, s } from "@/lib/getSettings"
import { ContactSection } from "@/components/public/ContactSection"
import { PageHeader } from "@/components/public/PageHeader"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings()
    return {
        title: "Contact",
        description: `Visit the ${s(settings.name, "our")} atelier or get in touch.`,
    }
}

export default async function ContactPage() {
    const settings = await getSettings()
    return (
        <main className="bg-background text-foreground overflow-hidden">
            <PageHeader 
                title="Get in Touch"
                subtitle="Whether you have a question about our collections or need a bespoke design, we're here to help."
            />
            <ContactSection settings={settings} />
        </main>
    )
}
