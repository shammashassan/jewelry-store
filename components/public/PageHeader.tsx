"use client"
import { motion } from "motion/react"

interface PageHeaderProps {
    title: string
    subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="pt-32 pb-16 text-center space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 
                    className="text-4xl lg:text-7xl font-playfair font-bold text-foreground"
                    style={{ fontFamily: "var(--font-playfair)" }}
                >
                    {title}
                </h1>
            </motion.div>
            {subtitle && (
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-muted-foreground max-w-lg mx-auto text-sm lg:text-base leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            )}
            <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-24 h-px bg-primary/30 mx-auto mt-8"
            />
        </div>
    )
}
