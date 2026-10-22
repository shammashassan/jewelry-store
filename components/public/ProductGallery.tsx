"use client"

import { useState } from "react"
import NextImage from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { ZoomIn, Gem } from "lucide-react"

interface ProductGalleryProps {
    images: string[]
    fallbackName: string
}

export function ProductGallery({ images, fallbackName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    if (images.length === 0) {
        return (
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted/30 border border-border/40">
                <div className="w-full h-full flex items-center justify-center">
                    <Gem className="size-20 text-muted-foreground opacity-30" />
                </div>
            </div>
        )
    }

    const activeImage = images[activeIndex]

    return (
        <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
            {/* Main Image Display */}
            <div className="relative w-full aspect-square md:aspect-4/5 lg:aspect-square overflow-hidden rounded-[2rem] bg-muted/20 border border-border/40 group cursor-zoom-in max-h-[400px] lg:max-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <NextImage
                            src={activeImage}
                            alt={`${fallbackName} - Image ${activeIndex + 1}`}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
                
                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-2xl">
                    <ZoomIn className="size-5 text-white" />
                </div>

                {/* Counter Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails Section */}
            {images.length > 1 && (
                <div className="flex flex-wrap justify-center gap-4 py-2">
                    {images.map((img, index) => (
                        <button
                            key={`${img}-${index}`}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "relative w-24 aspect-square rounded-2xl overflow-hidden bg-muted/30 border-2 transition-all duration-300 group",
                                activeIndex === index 
                                    ? "border-primary shadow-lg shadow-primary/20 scale-105 ring-4 ring-primary/10" 
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-border hover:scale-105"
                            )}
                        >
                            <NextImage
                                src={img}
                                alt={`${fallbackName} thumbnail ${index + 1}`}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                sizes="96px"
                            />
                            {activeIndex === index && (
                                <motion.div 
                                    layoutId="activeThumb"
                                    className="absolute inset-0 bg-primary/5 pointer-events-none"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
