// app/(public)/return-policy/page.tsx
import { PolicyPageLayout } from "@/components/public/PolicyPageLayout"

export default function ReturnPolicyPage() {
    return (
        <PolicyPageLayout title="Return & Refund Policy" lastUpdated="March 2026">
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">1. Return Eligibility</h2>
                <p>We pride ourselves on the quality of our craftsmanship. If you are not completely satisfied with your purchase, standard jewelry designs can be returned or exchanged within 7 days of delivery, provided they are in их original, unworn condition with all tags and certifications intact.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">2. Non-Returnable Items</h2>
                <p>Due to their custom nature, the following items cannot be returned or exchanged:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Customized or bespoke jewelry made to your specifications.</li>
                    <li>Items that have been resized, modified, or damaged after delivery.</li>
                    <li>Items without original certifications and hallmark documentation.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">3. Return Process</h2>
                <p>Contact us via WhatsApp to initiate a return. We will guide you through the secure shipping process. Once the item is received and passes our quality inspection, your refund or exchange will be processed within 7-10 business days.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">4. Refund Method</h2>
                <p>Refunds will be processed to the original payment method used or as store credit, depending on your preference and the nature of the transaction.</p>
            </section>
        </PolicyPageLayout>
    )
}
