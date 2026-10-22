"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // MORPHING LOGIC FOR THE HERO IMAGE
    // Scale from 1 (full screen) to 0.4 (small card)
    const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 0.5]);

    // Move it to the left side of the screen
    const heroX = useTransform(smoothProgress, [0, 0.4], ["0%", "-20%"]);

    // Add rounded corners as it shrinks
    const heroBorderRadius = useTransform(smoothProgress, [0, 0.4], ["0rem", "2rem"]);

    // NEW CONTENT ENTRANCE (The features/text)
    const contentX = useTransform(smoothProgress, [0.3, 0.6], ["100%", "0%"]);
    const contentOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

    return (
        <div ref={containerRef} data-hide-navbar="true" className="relative h-[400vh] bg-background">
            {/* Top divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-30" />

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* --- THE MORPHING HERO --- */}
                <motion.div
                    style={{
                        scale: heroScale,
                        x: heroX,
                        borderRadius: heroBorderRadius
                    }}
                    className="relative z-20 w-full h-full bg-neutral-900 shadow-2xl overflow-hidden border border-white/5"
                >
                    <img
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000"
                        className="w-full h-full object-cover grayscale opacity-60"
                        alt="Aurum Craftsmanship"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Hero Content that fades out as it shrinks */}
                    <motion.div
                        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4">
                            Aurum
                        </h2>
                        <p className="text-xl md:text-2xl font-light text-neutral-400">
                            The Art of Pure Gold
                        </p>
                    </motion.div>
                </motion.div>

                {/* --- THE REVEALED CONTENT --- */}
                <motion.div
                    style={{ x: contentX, opacity: contentOpacity }}
                    className="absolute right-[5%] w-[90%] md:w-[35%] z-10"
                >
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                                Crafting Legacy <br /> in Every Detail.
                            </h2>
                            <p className="text-muted-foreground text-xl leading-relaxed">
                                At Aurum, we blend ancient artisanal techniques with modern design to create jewelry that transcends generations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <h4 className="font-bold text-foreground text-lg">Timeless</h4>
                                <p className="text-sm text-muted-foreground mt-2">Designs and materials that never lose their luster.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <h4 className="font-bold text-foreground text-lg">Artisanal</h4>
                                <p className="text-sm text-muted-foreground mt-2">Each piece is meticulously handcrafted by masters.</p>
                            </div>
                        </div>

                        <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:bg-neutral-200 active:scale-95 flex items-center gap-2 outline-1">
                            <span>Explore Collection</span>
                        </button>
                    </div>
                </motion.div>

            </div>

            {/* Bottom divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-white/10 to-transparent z-30" />
        </div>
    );
}