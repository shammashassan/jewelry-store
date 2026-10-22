// app/(public)/faq/page.tsx
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageSquareText, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSettings } from "@/lib/getSettings"
import { PageHeader } from "@/components/public/PageHeader"

const faqs = [
    {
        category: "Product & Quality",
        items: [
            {
                q: "Is your jewelry certified?",
                a: "Yes, all our gold jewelry is BIS Hallmarked, and our diamond jewelry comes with certification from reputed laboratories like IGI or GIA."
            },
            {
                q: "Do you offer customization?",
                a: "Absolutely! We specialize in bespoke designs. You can share your inspiration or requirements with us on WhatsApp, and our designers will bring it to life."
            },
            {
                q: "What materials do you use?",
                a: "We only use premium materials including 18K and 22K Gold, high-quality Diamonds (GH-SI or higher), and authentic gemstones."
            }
        ]
    },
    {
        category: "Ordering & Enquiries",
        items: [
            {
                q: "How can I place an order?",
                a: "Since we focus on a personalized experience, we don't have a direct checkout. Simply click 'Enquire on WhatsApp' on any product page to chat with our experts and finalize your order."
            },
            {
                q: "Can I see the jewelry in person?",
                a: "Yes, we offer video call consultations where you can see the pieces in detail. Physical store visits are also available by appointment."
            }
        ]
    },
    {
        category: "Shipping & Returns",
        items: [
            {
                q: "Do you ship internationally?",
                a: "Currently, we offer insured shipping all across India. For international enquiries, please contact us directly on WhatsApp."
            },
            {
                q: "What is your return policy?",
                a: "We offer a 7-day return policy for standard designs. Customized pieces are generally non-returnable but we ensure your satisfaction through every step of the creation process."
            }
        ]
    }
]

export default async function FAQPage() {
    const settings = await getSettings()

    return (
        <main className="bg-background min-h-screen">
            <PageHeader 
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about our craftsmanship, ordering process, and policies."
            />
            <div className="max-w-4xl mx-auto px-6 pb-24">

                <div className="space-y-12">
                    {faqs.map((cat, idx) => (
                        <div key={idx} className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-primary flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-primary/30" />
                                {cat.category}
                            </h2>
                            <Accordion type="single" collapsible className="w-full">
                                {cat.items.map((item, i) => (
                                    <AccordionItem key={i} value={`item-${idx}-${i}`} className="border-border/60 overflow-hidden">
                                        <AccordionTrigger className="text-sm font-semibold py-6 hover:no-underline hover:text-primary transition-colors text-left px-2">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed pb-6 px-2">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                {/* Still have questions? */}
                <div className="mt-24 p-12 rounded-[2rem] bg-muted/30 border border-border/40 text-center space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-playfair font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Still have questions?</h3>
                        <p className="text-muted-foreground text-sm">We're here to help you choose the perfect piece.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                        <Button asChild className="h-14 rounded-xl tracking-widest uppercase text-xs font-bold shadow-xl shadow-primary/20">
                            <a href={settings.whatsapp} target="_blank" rel="noreferrer">
                                <MessageSquareText className="size-4 mr-2" />
                                WhatsApp Us
                            </a>
                        </Button>
                        <Button variant="outline" asChild className="h-14 rounded-xl tracking-widest uppercase text-xs font-bold border-border/60">
                            <Link href="/contact">
                                <Mail className="size-4 mr-2" />
                                Contact Form
                            </Link>
                        </Button>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        <div className="flex items-center gap-2">
                            <Phone className="size-3" />
                            {settings.phone}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="size-3" />
                            {settings.address}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
