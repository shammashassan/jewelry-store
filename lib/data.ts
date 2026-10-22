// ============================================================
// lib/data.ts — Central data store for all placeholder content
// Edit this file to update content across the entire site.
// ============================================================

export const siteConfig = {
    name: "AURUM",
    tagline: "Where Gold Meets Grace",
    description:
        "Exquisite handcrafted jewellery for the discerning few. Each piece tells a story of artistry, tradition, and timeless elegance.",
    email: "hello@aurum.com",
    phone: "+91 98765 43210",
    address: "12 Gold Souk Lane, Thrissur, Kerala 680001",
    instagram: "https://instagram.com/aurumjewellery",
    facebook: "https://facebook.com/aurumjewellery",
    whatsapp: "https://wa.me/919876543210",
    mapEmbedUrl: "",
    currency: "₹",
    currencyCode: "INR",
}

export const navLinks = [
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
]

export const heroContent = {
    badge: "New Collection 2025",
    heading: "Crafted for\nEternity",
    subheading:
        "Each AURUM piece is born from generations of goldsmith mastery — forged in fire, finished with devotion.",
    cta: { label: "Explore Collections", href: "/collections" },
    ctaSecondary: { label: "Our Story", href: "/about" },
}

export const collectionsPlaceholder = [
    {
        id: "1",
        name: "Bridal Radiance",
        category: "Bridal",
        price: 145000,
        image: "/placeholder/ring-01.jpg",
        tag: "Bestseller",
        description: "18K gold with hand-set diamonds, crafted for your most sacred day.",
    },
    {
        id: "2",
        name: "The Sovereign Necklace",
        category: "Necklaces",
        price: 89500,
        image: "/placeholder/necklace-01.jpg",
        tag: "New",
        description: "A statement of quiet power — 22K gold with temple-inspired motifs.",
    },
    {
        id: "3",
        name: "Celestial Ear Drops",
        category: "Earrings",
        price: 34000,
        image: "/placeholder/earring-01.jpg",
        tag: "",
        description: "Delicate drops that catch the light with every turn.",
    },
    {
        id: "4",
        name: "Heritage Bangle Set",
        category: "Bangles",
        price: 210000,
        image: "/placeholder/bangle-01.jpg",
        tag: "Limited",
        description: "Hand-engraved traditional motifs in 22K hallmarked gold.",
    },
    {
        id: "5",
        name: "Lotus Pendant",
        category: "Pendants",
        price: 18500,
        image: "/placeholder/pendant-01.jpg",
        tag: "",
        description: "Symbolic lotus in yellow gold — a gift of meaning and beauty.",
    },
    {
        id: "6",
        name: "Royal Choker",
        category: "Necklaces",
        price: 320000,
        image: "/placeholder/choker-01.jpg",
        tag: "Exclusive",
        description: "An heirloom-grade choker inspired by Mughal court jewellery.",
    },
]

export const categories = [
    "All",
    "Bridal",
    "Necklaces",
    "Earrings",
    "Bangles",
    "Pendants",
    "Rings",
]

export const aboutContent = {
    badge: "Est. 1987",
    heading: "Three Generations\nof Mastery",
    body: [
        "AURUM was founded in 1987 by master goldsmith Rajan Varma in the heart of Thrissur — Kerala's gold capital. What began as a small workshop has grown into a legacy of trust, craftsmanship, and uncompromising quality.",
        "Every piece that leaves our atelier is the result of weeks of meticulous work by our artisans, who combine age-old techniques with contemporary sensibilities. We source only BIS-hallmarked gold and certified stones.",
        "We believe jewellery is not an accessory — it is memory, emotion, and identity cast in metal.",
    ],
    stats: [
        { value: "37+", label: "Years of Craft" },
        { value: "12,000+", label: "Happy Families" },
        { value: "BIS", label: "Hallmarked Gold" },
        { value: "100%", label: "Ethically Sourced" },
    ],
    image: "/images/about-atelier.jpg",
}

export const testimonials = [
    {
        id: "1",
        name: "Priya Nair",
        location: "Kochi, Kerala",
        avatar: "",
        rating: 5,
        text: "My bridal set from AURUM was everything I dreamed of. The craftsmanship is extraordinary and the team made the experience so personal. I will treasure it forever.",
        product: "Bridal Radiance Set",
    },
    {
        id: "2",
        name: "Ananya Krishnan",
        location: "Thrissur, Kerala",
        avatar: "",
        rating: 5,
        text: "I've been buying from AURUM for 15 years. Their consistency in quality and design is unmatched. Every piece feels like an heirloom from day one.",
        product: "Heritage Bangle Set",
    },
    {
        id: "3",
        name: "Sreeja Menon",
        location: "Bangalore, Karnataka",
        avatar: "",
        rating: 5,
        text: "The Royal Choker I ordered exceeded all expectations. Pure artistry. They packed it beautifully and delivered on time for my anniversary.",
        product: "Royal Choker",
    },
    {
        id: "4",
        name: "Divya Suresh",
        location: "Chennai, Tamil Nadu",
        avatar: "",
        rating: 5,
        text: "Trustworthy, transparent about hallmarking, and genuinely artistic. AURUM is the only jeweller I recommend to all my friends and family.",
        product: "Celestial Ear Drops",
    },
]

export const contactContent = {
    heading: "Visit Our Atelier",
    subheading:
        "We welcome you by appointment or walk-in. Our team is here to guide you through our collections and craft your perfect piece.",
    hours: [
        { day: "Monday – Saturday", time: "10:00 AM – 7:30 PM" },
        { day: "Sunday", time: "11:00 AM – 5:00 PM" },
    ],
}

export const footerContent = {
    tagline: "Timeless pieces for those who value legacy over trend.",
    columns: [
        {
            heading: "Help & Info",
            links: [
                { label: "FAQ", href: "/faq" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Return Policy", href: "/return-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy-policy" },
            ],
        },
    ],
}