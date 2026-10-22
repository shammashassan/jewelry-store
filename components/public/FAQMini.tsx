"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, ShieldCheck, Globe, Gem, MessageSquare } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

type FAQItem = {
    id: string
    icon: any
    question: string
    answer: string
}

export function FAQMini() {
    const faqItems: FAQItem[] = [
        {
            id: "item-1",
            icon: MessageSquare,
            question: "How do I place an order via WhatsApp?",
            answer: "Simply click 'Enquire on WhatsApp' on any product page. This will open a chat with our team with the product details pre-filled. We'll guide you through the customization, pricing, and payment process.",
        },
        {
            id: "item-2",
            icon: ShieldCheck,
            question: "Are your diamonds and gold certified?",
            answer: "Yes, 100%. All our gold is BIS Hallmarked, and our diamonds/gemstones come with certificates from reputable labs like GIA, IGI, or HRD.",
        },
        {
            id: "item-3",
            icon: Globe,
            question: "Do you offer international shipping?",
            answer: "Yes, we ship across India and to many international locations. Shipping costs and delivery times vary by region.",
        },
        {
            id: "item-4",
            icon: Gem,
            question: "Can I customize an existing design?",
            answer: "Absolutely. We specialize in bespoke jewelry. We can modify our existing designs or create something entirely new based on your requirements.",
        },
    ]

    return (
        <section className="bg-muted/30 py-28 relative">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold"
                            >
                                Help & Support
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                Frequently Asked Questions
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-muted-foreground mt-8 text-sm leading-relaxed"
                            >
                                Can't find what you're looking for? Contact our{" "}
                                <Link href="/contact" className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>{" "}
                                for personalized assistance.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="mt-10"
                            >
                                <Link
                                    href="/faq"
                                    className="inline-flex items-center text-primary text-xs tracking-[0.2em] uppercase font-semibold border-b border-primary/30 hover:border-primary transition-colors pb-1"
                                >
                                    View All FAQs
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    <div className="lg:w-2/3 relative">
                        <Accordion type="single" collapsible className="w-full space-y-4 relative">
                            {faqItems.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <AccordionItem
                                        value={item.id}
                                        className="bg-background shadow-xs rounded-2xl border px-6 transition-all duration-300 data-[state=open]:shadow-md"
                                    >
                                        <AccordionTrigger className="cursor-pointer items-center py-6 hover:no-underline group">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="flex size-10 rounded-full bg-primary/5 group-data-[state=open]:bg-primary/10 transition-colors">
                                                    <item.icon className="m-auto size-5 text-primary" />
                                                </div>
                                                <span className="font-playfair text-lg md:text-xl font-medium" style={{ fontFamily: "var(--font-playfair)" }}>
                                                    {item.question}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <div className="pl-14">
                                                <p className="text-muted-foreground text-base leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
