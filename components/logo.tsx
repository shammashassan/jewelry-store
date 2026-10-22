"use client"

import Link from "next/link"
import { siteConfig } from "@/lib/data"
import { cn } from "@/lib/utils"

export const Logo = ({ light }: { light?: boolean }) => {
    const name = siteConfig.name
    const tagline = siteConfig.tagline

    return (
        <div className="flex flex-col leading-none group">
            <span
                className={cn(
                    "font-playfair text-2xl font-bold tracking-[0.15em] transition-colors",
                    light ? "text-white" : "text-primary"
                )}
                style={{ fontFamily: "var(--font-playfair)" }}
            >
                {name}
            </span>
            <span className={cn(
                "text-[10px] tracking-[0.3em] uppercase mt-0.5",
                light ? "text-white/60" : "text-muted-foreground/60"
            )}>
                {tagline}
            </span>
        </div>
    )
}
