"use client"

import Image from "next/image"
import { motion } from "motion/react"
// import { Instagram } from "lucide-react"
const Instagram = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

const images = [
    { src: "/images/instagram/insta_1.png", alt: "Jewelry lifestyle" },
    { src: "/images/instagram/insta_2.png", alt: "Handcrafted process" },
    { src: "/images/instagram/insta_3.png", alt: "Luxury box" },
    { src: "/images/instagram/insta_4.png", alt: "Heritage bangles" },
]

import { siteConfig } from "@/lib/data"

export function InstagramGallery() {
    return (
        <section className="py-24 bg-background relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center p-3 rounded-full bg-muted mb-6 text-primary"
                    >
                        <Instagram className="size-6" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Follow Our Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-sm tracking-wide"
                    >
                        @AURUMJewellery — Capturing the essence of elegance.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative aspect-square overflow-hidden bg-muted rounded-xl"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 size-8" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
