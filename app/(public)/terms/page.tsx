// app/(public)/terms/page.tsx
import { PolicyPageLayout } from "@/components/public/PolicyPageLayout"

export default function TermsPage() {
    return (
        <PolicyPageLayout title="Terms & Conditions" lastUpdated="March 2026">
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
                <p>By accessing our website, you agree to be bound by these terms and conditions. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">2. Product Information</h2>
                <p>We strive to be as accurate as possible in describing our products. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free. Every diamond and gemstone is unique, and slight variations from images may occur.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">3. Pricing</h2>
                <p>All prices are subject to change without notice. Due to the volatile nature of precious metal and gemstone markets, prices are finalized only at the time of order confirmation via WhatsApp.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">4. Intellectual Property</h2>
                <p>The content, organization, graphics, design, and other matters related to the site are protected under applicable copyrights and trademarks. The copying, redistribution, or use by you of any such matters is strictly prohibited.</p>
            </section>
        </PolicyPageLayout>
    )
}
