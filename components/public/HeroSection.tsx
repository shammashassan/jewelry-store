// components/public/HeroSection.tsx
'use client'

import React from 'react'
import SliderPage from './SliderPage'

export function HeroSection() {
    // SliderPage already has hard-coded slides and config.
    return (
        <section className="fixed top-0 left-0 w-full h-screen z-0" data-navbar-theme="dark">
            <SliderPage />
            {/* Optional: Overlay settings-based hero content here if needed, 
                but SliderPage already has its own title/UI. 
                I'll keep it exactly as the user provided. */}
        </section>
    )
}