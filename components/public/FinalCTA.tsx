"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
    // top row — scroll upward
    { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338", alt: "Gold necklace with diamond pendant", speed: 0.2, position: "top" },
    { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a", alt: "Elegant pearl earrings", speed: 0.5, position: "top" },
    { src: "https://images.unsplash.com/photo-1601821765780-754fa98637c1", alt: "Diamond engagement ring", speed: 0.3, position: "top" },
    { src: "https://images.unsplash.com/photo-1721034909472-390b9325f415", alt: "Rose gold bracelet", speed: 0.8, position: "top" },
    { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908", alt: "Sapphire gemstone ring", speed: 0.4, position: "top" },
    { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e", alt: "Fine jewelry flat lay", speed: 0.6, position: "top" },
    // bottom row — scroll downward
    { src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0", alt: "Luxury watch and ring", speed: 0.4, position: "bottom" },
    { src: "https://images.unsplash.com/photo-1616803689943-5601631c7fec", alt: "Handcrafted gold chain", speed: 0.7, position: "bottom" },
    { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f", alt: "Emerald cut gemstones", speed: 0.3, position: "bottom" },
    { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3", alt: "Diamond tennis bracelet", speed: 0.5, position: "bottom" },
    { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a", alt: "Artisan silver earrings", speed: 0.9, position: "bottom" },
    { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186", alt: "Layered gold necklaces", speed: 0.2, position: "bottom" },
];

export function FinalCTA({ settings }: { settings: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress for that "premium" feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Background Text Animations
    const textScale = useTransform(smoothProgress, [0, 0.5], [0.8, 1]);
    const textOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* CENTER CONTENT */}
                <motion.div
                    style={{ scale: textScale, opacity: textOpacity }}
                    className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                >
                    <span className="block text-[10px] font-mono text-amber-500 mb-6 tracking-[0.4em] uppercase opacity-70">
                        // Timeless Craftsmanship
                    </span>

                    <h2 className="text-foreground text-4xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1] text-balance">
                        Jewelry Crafted for <br />
                        <span className="text-muted-foreground">Every Moment.</span>
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
                        Discover our curated collections of fine jewelry — from radiant diamonds
                        to hand-set gemstones — each piece thoughtfully crafted to be treasured forever.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/collections"
                            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:opacity-90 active:scale-95 shadow-xl"
                        >
                            Shop Collections
                            <div className="w-4 h-px bg-background group-hover:w-8 transition-all duration-300" />
                        </Link>
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-3 px-10 py-4 border border-border text-foreground text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:bg-muted active:scale-95"
                        >
                            Book a Consultation
                        </Link>
                    </div>
                </motion.div>

                {/* IMAGE GRID LAYER */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 h-full">
                        {IMAGES.map((img, i) => (
                            <ParallaxImage
                                key={i}
                                src={img.src}
                                alt={img.alt}
                                progress={smoothProgress}
                                speed={img.speed}
                                direction={img.position === "top" ? -1 : 1}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function ParallaxImage({ src, alt, progress, speed, direction }: {
    src: string,
    alt: string,
    progress: any,
    speed: number,
    direction: number
}) {
    const y = useTransform(progress, [0, 1], [0, direction * (speed * 1200)]);
    const opacity = useTransform(progress, [0, 0.8], [1, 0.4]);

    return (
        <motion.div
            style={{ y, opacity }}
            className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border border-border/20"
        >
            <Image
                src={`${src}?auto=format&fit=crop&q=80&w=600`}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 15vw"
            />
        </motion.div>
    );
}
