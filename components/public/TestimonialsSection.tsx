"use client"

import React from "react"
import { motion } from "motion/react"
import { TestimonialsColumn } from "@/components/ui/testimonials-carousel"

const jewelryTestimonials = [
  {
    text: "My bridal set from AURUM was everything I dreamed of. The craftsmanship is extraordinary and the team made the experience so personal. I will treasure it forever.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Priya Nair",
    role: "Bride | Kochi",
  },
  {
    text: "I've been buying from AURUM for 15 years. Their consistency in quality and design is unmatched. Every piece feels like an heirloom from day one.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ananya Krishnan",
    role: "Collector | Thrissur",
  },
  {
    text: "The Royal Choker I ordered exceeded all expectations. Pure artistry. They packed it beautifully and delivered on time for my anniversary.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sreeja Menon",
    role: "Client | Bangalore",
  },
  {
    text: "The Sovereign Necklace is a masterpiece. It carries a sense of quiet power and heritage that is hard to find in modern jewelry.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Meera Iyer",
    role: "Business Leader | Mumbai",
  },
  {
    text: "Trustworthy, transparent about hallmarking, and genuinely artistic. AURUM is the only jeweller I recommend to all my friends and family.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Divya Suresh",
    role: "Client | Chennai",
  },
  {
    text: "World-class craftsmanship. The Lotus Pendant is my daily favorite — simple, symbolic, and stunningly finished.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Jacob",
    role: "Designer | Dubai",
  },
  {
    text: "Exceptional service and exquisite designs. The diamond studs I purchased for my daughter's wedding were the highlight of her ensemble.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Kavita Reddy",
    role: "Client | Hyderabad",
  },
  {
    text: "Unmatched quality. Their attention to detail in the hand-engraving of my bangles shows the true mastery of their artisans.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Lakshmi Sharma",
    role: "Heirloom Seeker | Delhi",
  },
  {
    text: "Beautifully designed and ethically sourced. Truly premium experience from the moment I stepped into the atelier.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Amrita Rao",
    role: "Client | Pune",
  },
]

const firstColumn = jewelryTestimonials.slice(0, 3)
const secondColumn = jewelryTestimonials.slice(3, 6)
const thirdColumn = jewelryTestimonials.slice(6, 9)

export function TestimonialsSection() {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6"
          >
            Voices of Trust
          </motion.div>

          <motion.h2 
            id="testimonials-heading" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-playfair font-bold tracking-tight text-center text-foreground mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Client Stories
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-muted-foreground/70 text-lg leading-relaxed max-w-lg"
          >
            Discover the experiences of our esteemed clients who have found their perfect pieces within our collection.
          </motion.p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[760px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={20} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={25} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />
        </div>
      </div>

      {/* Decorative gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}

