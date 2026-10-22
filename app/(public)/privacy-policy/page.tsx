// app/(public)/privacy-policy/page.tsx
import { PolicyPageLayout } from "@/components/public/PolicyPageLayout"

export default function PrivacyPolicyPage() {
    return (
        <PolicyPageLayout title="Privacy Policy" lastUpdated="March 2026">
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
                <p>Welcome to our jewelry store. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">2. Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Identity Data (name, username)</li>
                    <li>Contact Data (email address, telephone numbers)</li>
                    <li>Technical Data (IP address, browser type and version)</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">3. How We Use Your Data</h2>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, and where it is necessary for our legitimate interests.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">4. WhatsApp Interactions</h2>
                <p>Our primary mode of communication is WhatsApp. By clicking on 'Enquire on WhatsApp', you agree to initiate a conversation with us. We will use the information shared during these conversations solely to assist you with your enquiries and orders.</p>
            </section>
        </PolicyPageLayout>
    )
}
