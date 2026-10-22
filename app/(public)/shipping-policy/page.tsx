// app/(public)/shipping-policy/page.tsx
import { PolicyPageLayout } from "@/components/public/PolicyPageLayout"

export default function ShippingPolicyPage() {
    return (
        <PolicyPageLayout title="Shipping Policy" lastUpdated="March 2026">
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">1. Shipping Coverage</h2>
                <p>We provide insured shipping to most pin codes across India. For international shipping enquiries, please contact our team via WhatsApp to discuss availability and costs.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">2. Processing Time</h2>
                <p>Standard pieces are usually dispatched within 3-5 business days. Customized jewelry and made-to-order items may take 15-25 business days for production and quality check before dispatch.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">3. Tracking & Insurance</h2>
                <p>All our shipments are 100% insured until they reach your doorstep. Once dispatched, you will receive a tracking ID to monitor your order's progress.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">4. Delivery Expectations</h2>
                <p>Depending on your location, delivery typically takes 2-7 business days after dispatch. We use reputed couriers specialized in precious cargo to ensure the safety of your jewelry.</p>
            </section>
        </PolicyPageLayout>
    )
}
