"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'
import { navLinks } from '@/lib/data'
import type { Settings } from "@/lib/getSettings"

export function Navbar({ settings }: { settings: Settings }) {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [isDarkSection, setIsDarkSection] = React.useState(true)
    const [isHidden, setIsHidden] = React.useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    const { scrollY } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setScrolled(latest > 50)
        })
        return () => unsubscribe()
    }, [scrollY])

    React.useEffect(() => {
        const checkNavbarState = () => {
            if (!isHomePage) {
                setIsDarkSection(false)
                return
            }

            const darkSections = document.querySelectorAll('[data-navbar-theme="dark"]')
            let foundDark = false
            
            const hideSections = document.querySelectorAll('[data-hide-navbar="true"]')
            let foundHide = false

            // Check which section is currently overlapping with the navbar top (80px height)
            darkSections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                if (rect.top <= 80 && rect.bottom >= 0) {
                    foundDark = true
                }
            })

            hideSections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                // A buffer of 80px for the navbar height
                if (rect.top <= 80 && rect.bottom >= 80) {
                    foundHide = true
                }
            })
            
            // If the user scrolls past the first view height on home page, 
            // the sticky hero is potentially covered by the overlap section
            if (window.scrollY >= window.innerHeight - 80) {
                 foundDark = false;
            }
            
            setIsDarkSection(foundDark)
            setIsHidden(foundHide)
        }

        // Run on scroll
        const unsubscribe = scrollY.on('change', () => {
            checkNavbarState()
        })

        // Initial check
        checkNavbarState()

        // Handle window resizing or dynamic content
        window.addEventListener('resize', checkNavbarState)
        
        return () => {
            unsubscribe()
            window.removeEventListener('resize', checkNavbarState)
        }
    }, [isHomePage, scrollY])

    // Hero state: at top of home page OR over a dark section
    const isHeroState = isHomePage && (isDarkSection || (!scrolled && isHomePage)) && !menuState

    return (
        <header className="relative">
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-100 w-full border-b transition-all duration-500',
                    isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
                    !isHeroState
                        ? 'bg-background/80 backdrop-blur-3xl border-border/50 py-3 shadow-sm'
                        : 'bg-transparent border-transparent py-5'
                )}>
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-center justify-between">
                        {/* Left: Logo */}
                        <div className="flex-1 flex justify-start">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center">
                                <Logo light={isHeroState} />
                            </Link>
                        </div>

                        {/* Center: Desktop Navigation */}
                        <div className="hidden lg:flex flex-initial px-4">
                            <ul className="flex items-center gap-10 text-sm whitespace-nowrap">
                                {navLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block duration-150 uppercase tracking-[0.2em] text-[11px] font-medium transition-colors",
                                                !isHeroState
                                                    ? "text-muted-foreground/80 hover:text-primary"
                                                    : "text-white/80 hover:text-white"
                                            )}>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex-1 flex items-center justify-end gap-4 min-w-fit">
                            {/* Desktop Buttons */}
                            <div className="hidden lg:flex items-center gap-4">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        " px-6 tracking-widest text-[10px] uppercase h-10 transition-all duration-300 font-medium",
                                        !isHeroState
                                            ? "border-primary/20 hover:border-primary/40 hover:bg-transparent text-foreground"
                                            : "border-white/20 hover:border-white/40 text-white/70 hover:text-white bg-transparent hover:bg-white/10"
                                    )}>
                                    <Link href="/contact">
                                        <span>Inquiry</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(
                                        " px-6 tracking-widest text-[10px] uppercase h-10 shadow-lg transition-all duration-300 font-medium",
                                        !isHeroState
                                            ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
                                            : "bg-white text-black hover:bg-white/90 shadow-white/10"
                                    )}>
                                    <Link href="/collections">
                                        <span>Collections</span>
                                    </Link>
                                </Button>
                            </div>

                            {/* Mobile Toggle Button */}
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-50 -m-2.5 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className={cn(
                                    "m-auto size-6 duration-200 transition-all",
                                    isHeroState ? "text-white" : "text-foreground",
                                    menuState ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                                )} />
                                <X className={cn(
                                    "absolute inset-0 m-auto size-6 duration-200 transition-all",
                                    "text-foreground",
                                    menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
                                )} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={cn(
                        "lg:hidden fixed inset-0 z-40 bg-background transition-all duration-300",
                        menuState
                            ? "opacity-100 visible h-screen"
                            : "opacity-0 invisible h-0"
                    )}>
                        <div className="flex flex-col items-center justify-center h-full px-6 space-y-12">
                            <ul className="flex flex-col items-center gap-8 text-sm">
                                {navLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuState(false)}
                                            className="text-foreground hover:text-primary block duration-150 uppercase tracking-[0.3em] text-lg font-medium">
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col w-full max-w-sm gap-4">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full  tracking-widest text-xs uppercase h-12">
                                    <Link href="/contact" onClick={() => setMenuState(false)}>
                                        Inquiry
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    className="w-full  tracking-widest text-xs uppercase h-12">
                                    <Link href="/collections" onClick={() => setMenuState(false)}>
                                        Explore Collections
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}