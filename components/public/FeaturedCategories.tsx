"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"

const categories = [
    {
        name: "Rings",
        href: "/collections?category=rings",
        image: "/images/categories/rings.png",
    },
    {
        name: "Necklaces",
        href: "/collections?category=necklaces",
        image: "/images/categories/necklaces.png",
    },
    {
        name: "Bracelets",
        href: "/collections?category=bracelets",
        image: "/images/categories/bracelets.png",
    },
    {
        name: "Earrings",
        href: "/collections?category=earrings",
        image: "/images/categories/earrings.png",
    },
]

export function FeaturedCategories() {
    return (
        <section className="py-24 bg-background overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative">
                    <div className="relative">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold"
                        >
                            Curated Selection
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Shop by Category
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={cat.href} className="group block relative aspect-4/5 overflow-hidden bg-muted">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    priority={idx < 4}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center overflow-hidden">
                                        <h3 className="text-white font-playfair text-2xl tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                                            style={{ fontFamily: "var(--font-playfair)" }}>
                                            {cat.name}
                                        </h3>
                                        <div className="h-0.5 w-0 group-hover:w-full bg-white mx-auto transition-all duration-500" />
                                        <p className="text-white/0 group-hover:text-white/90 text-[10px] tracking-[0.2em] uppercase mt-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-medium">
                                            Explore
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
