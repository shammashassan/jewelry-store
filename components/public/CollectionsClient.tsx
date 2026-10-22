"use client"
// components/public/CollectionsClient.tsx
// Client component for interactivity (category filter).
// Receives server-fetched products and categories as props.
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageSquareText, SlidersHorizontal, Gem } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, formatPrice } from "@/lib/utils"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel } from "@/components/ui/field"
import { PageHeader } from "./PageHeader"
import { Button } from "@/components/ui/button"

interface Category { _id: string; name: string; slug: string }
interface Product {
    _id: string
    name: string
    description: string
    price: number
    images: string[]
    category?: { _id: string; name: string; slug: string }
    material?: string
    createdAt: string
}

interface Props {
    products: Product[]
    categories: Category[]
    currency: string
    whatsapp?: string
}

const PRICE_RANGES = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under ₹25,000", min: 0, max: 25000 },
    { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
    { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
    { label: "Over ₹1,00,000", min: 100000, max: Infinity },
]

const MATERIALS = ["All Materials", "Gold", "Silver", "Diamond", "Platinum", "Rose Gold", "White Gold", "Gemstone"]

const SORT_OPTIONS = [
    { label: "Latest", value: "latest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Material", value: "material" },
]

export function CollectionsClient({ products, categories, currency, whatsapp }: Props) {
    const [activeId, setActiveId] = useState<string>("all")
    const [priceRangeLabel, setPriceRangeLabel] = useState(PRICE_RANGES[0].label)
    const [material, setMaterial] = useState("All Materials")
    const [sortBy, setSortBy] = useState("latest")

    const priceRange = PRICE_RANGES.find(r => r.label === priceRangeLabel) || PRICE_RANGES[0]

    let filtered = products.filter((p) => {
        const matchesCategory = activeId === "all" || p.category?._id === activeId
        const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max
        
        // Handle cases where material might be missing in older data
        const productMaterial = p.material || "Gold"
        const matchesMaterial = material === "All Materials" || productMaterial.toLowerCase() === material.toLowerCase()
        
        return matchesCategory && matchesPrice && matchesMaterial
    })

    // Sorting
    filtered = [...filtered].sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price
        if (sortBy === "price_desc") return b.price - a.price
        if (sortBy === "material") {
            const matA = (a.material || "Gold").toLowerCase();
            const matB = (b.material || "Gold").toLowerCase();
            return matA.localeCompare(matB);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return (
        <section className="bg-background">
            <PageHeader 
                title="Our Collections" 
                subtitle="Explore our curated selection of fine jewelry, handcrafted to perfection for every occasion."
            />
            
            <div className="max-w-7xl mx-auto px-6 pb-24">
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-center mb-12 gap-8 border-b border-border/40 pb-8 overflow-x-auto lg:overflow-visible no-scrollbar">
                    <div className="flex flex-nowrap items-center justify-center gap-6 pb-2 lg:pb-0 mx-auto lg:mx-0">
                        {/* Category Filter */}
                        <Field orientation="horizontal" className="min-w-fit gap-3">
                            <FieldLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/60 font-medium px-1 whitespace-nowrap flex-none">Category</FieldLabel>
                            <Select value={activeId} onValueChange={setActiveId}>
                                <SelectTrigger className="h-10 border-border/60 text-[10px] tracking-widest uppercase font-semibold focus:ring-1 focus:ring-primary/20 transition-all min-w-[140px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent className="border-border/60">
                                    <SelectItem value="all" className="text-[10px] tracking-widest uppercase py-3 cursor-pointer">All Categories</SelectItem>
                                    {categories.map(c => (
                                        <SelectItem key={c._id} value={c._id} className="text-[10px] tracking-widest uppercase py-3 cursor-pointer">
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Price Filter */}
                        <Field orientation="horizontal" className="min-w-fit gap-3">
                            <FieldLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/60 font-medium px-1 whitespace-nowrap flex-none">Price Range</FieldLabel>
                            <Select value={priceRangeLabel} onValueChange={setPriceRangeLabel}>
                                <SelectTrigger className="h-10 border-border/60 text-[10px] tracking-widest uppercase font-semibold focus:ring-1 focus:ring-primary/20 transition-all min-w-[140px]">
                                    <SelectValue placeholder="All Prices" />
                                </SelectTrigger>
                                <SelectContent className="border-border/60">
                                    {PRICE_RANGES.map(r => (
                                        <SelectItem key={r.label} value={r.label} className="text-[10px] tracking-widest uppercase py-3 cursor-pointer">
                                            {r.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Material Filter */}
                        <Field orientation="horizontal" className="min-w-fit gap-3">
                            <FieldLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/60 font-medium px-1 whitespace-nowrap flex-none">Material</FieldLabel>
                            <Select value={material} onValueChange={setMaterial}>
                                <SelectTrigger className="h-10 border-border/60 text-[10px] tracking-widest uppercase font-semibold focus:ring-1 focus:ring-primary/20 transition-all min-w-[140px]">
                                    <SelectValue placeholder="All Materials" />
                                </SelectTrigger>
                                <SelectContent className="border-border/60">
                                    {MATERIALS.map(m => (
                                        <SelectItem key={m} value={m} className="text-[10px] tracking-widest uppercase py-3 cursor-pointer">
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Sort By Filter */}
                        <Field orientation="horizontal" className="min-w-fit gap-3">
                            <FieldLabel className="text-[10px] tracking-widest uppercase text-muted-foreground/60 font-medium px-1 whitespace-nowrap flex-none">Sort By</FieldLabel>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-10 border-border/60 text-[10px] tracking-widest uppercase font-semibold focus:ring-1 focus:ring-primary/20 transition-all min-w-[140px]">
                                    <SelectValue placeholder="Sort" />
                                </SelectTrigger>
                                <SelectContent className="border-border/60" align="end">
                                    {SORT_OPTIONS.map(o => (
                                        <SelectItem key={o.value} value={o.value} className="text-[10px] tracking-widest uppercase py-3 cursor-pointer">
                                            {o.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </div>

                {/* Empty state — no products at all */}
                {products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Gem className="size-12 text-muted-foreground/20" />
                        <p className="text-muted-foreground/60 text-sm tracking-wide font-playfair" style={{ fontFamily: "var(--font-playfair)" }}>No products yet</p>
                        <p className="text-muted-foreground/30 text-xs uppercase tracking-widest">Collections are being curated.</p>
                    </div>
                )}

                {/* Filtered empty state */}
                {products.length > 0 && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4 border border-dashed border-border/60 rounded-2xl">
                        <SlidersHorizontal className="size-8 text-muted-foreground/20" />
                        <p className="text-muted-foreground/60 text-sm font-playfair" style={{ fontFamily: "var(--font-playfair)" }}>No results found for these filters.</p>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-[10px] uppercase tracking-widest text-primary font-bold active:scale-95 transition-all"
                            onClick={() => {
                                setActiveId("all")
                                setPriceRangeLabel(PRICE_RANGES[0].label)
                                setMaterial("All Materials")
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}

                {/* Product grid */}
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {filtered.map((product) => (
                            <ProductCard key={product._id} product={product} currency={currency} whatsapp={whatsapp} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}


export function ProductCard({ product, currency, whatsapp }: { product: Product; currency: string; whatsapp?: string }) {
    const [hovered, setHovered] = useState(false)
    const image = product.images[0] ?? null
    const image2 = product.images[1] ?? null

    const priceText = formatPrice(product.price, currency)
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name} (${priceText}). Can you share more details?`)
    const whatsappNumber = whatsapp?.replace(/[^0-9]/g, "")
    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : "#"

    return (
        <div 
            className="group block relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative aspect-4/5 overflow-hidden bg-muted rounded-xl mb-6">
                <Link href={`/products/${product._id}`} className="block w-full h-full relative">
                    {image ? (
                        <Image
                            src={hovered && image2 ? image2 : image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Gem className="size-12 text-muted-foreground/20" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {product.category && (
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-primary/90 text-primary-foreground text-[10px] tracking-widest uppercase border-0 font-bold px-3 py-1 rounded-full backdrop-blur-md">
                                {product.category.name}
                            </Badge>
                        </div>
                    )}
                </Link>

                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none group-hover:pointer-events-auto">
                    <Button 
                        asChild
                        className="w-full bg-white hover:bg-transparent text-black hover:text-white border-2 border-transparent hover:border-white rounded-lg h-12 text-[10px] tracking-[0.2em] uppercase font-bold shadow-2xl transition-all duration-300"
                    >
                        <a href={whatsappLink} target="_blank" rel="noreferrer">
                            <MessageSquareText className="size-4 mr-2" />
                            Enquiry on WhatsApp
                        </a>
                    </Button>
                </div>
            </div>

            <div className="flex items-start justify-between">
                <div className="flex-1">
                    {product.category && (
                        <p className="text-muted-foreground/60 text-[10px] tracking-[0.2em] uppercase mb-1 font-semibold">
                            {product.category.name}
                        </p>
                    )}
                    <Link href={`/products/${product._id}`}>
                        <h3
                            className="font-playfair text-xl text-foreground group-hover:text-primary transition-colors leading-[1.2]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            {product.name}
                        </h3>
                    </Link>
                </div>
                <div className="text-right">
                    <p className="text-primary font-bold text-base mt-4 transition-transform group-hover:scale-110 duration-300">
                        {priceText}
                    </p>
                </div>
            </div>
        </div>
    )
}
