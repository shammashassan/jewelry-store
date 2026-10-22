import NextImage from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CircleCheck, Star, StarHalf, Gem, ShieldCheck, Truck, RefreshCw, ZoomIn } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, formatPrice } from "@/lib/utils"

import { connectDB } from "@/lib/db"
import Product from "@/lib/models/Product"
import { getSettings, s } from "@/lib/getSettings"
import { ProductCard } from "@/components/public/CollectionsClient"
import { ProductGallery } from "@/components/public/ProductGallery"

export const revalidate = 60

interface Props {
    params: Promise<{ id: string }>
}

async function getProduct(id: string) {
    try {
        await connectDB()
        const product = await Product.findOne({ _id: id, visible: true })
            .populate("category", "name slug")
            .lean()
        if (!product) return null
        return JSON.parse(JSON.stringify(product))
    } catch {
        return null
    }
}

async function getRelatedProducts(categoryId: string, currentProductId: string, material?: string) {
    try {
        await connectDB()
        const query: any = { 
            category: categoryId, 
            _id: { $ne: currentProductId },
            visible: true 
        }
        if (material) {
            query.material = material
        }
        const products = await Product.find(query)
        .limit(4)
        .populate("category", "name slug")
        .lean()
        return JSON.parse(JSON.stringify(products))
    } catch {
        return []
    }
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params
    const [product, settings] = await Promise.all([getProduct(id), getSettings()])

    if (!product) {
        return notFound()
    }

    const relatedProducts = await getRelatedProducts(product.category?._id, product._id, product.material)

    const { currency, whatsapp } = settings
    const currencySym = s(currency, "₹")
    const priceText = formatPrice(product.price, currencySym)
    const inStock = product.stock > 0

    // Build Whatsapp message
    const message = encodeURIComponent(`Hi, I'm interested in the ${product.name} (${priceText}). Can you share more details?`)
    const whatsappNumber = whatsapp?.replace(/[^0-9]/g, "")
    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : "#"

    // Map Images to array we can loop over easily
    const images: string[] = product.images?.length ? product.images : []

    const toTitleCase = (str: string) => 
        str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const productInfo = [
        { label: "Category", value: product.category?.name || "Jewelry" },
        { label: "Material", value: product.material ? toTitleCase(product.material) : "Not specified" },
        { label: "Weight", value: "4.50 Grams" }, // Placeholder for now
        { label: "Certification", value: "BIS Hallmarked" },
        { label: "Stock Status", value: inStock ? "In Stock" : "Made to order" },
    ]

    const trustElements = [
        { icon: ShieldCheck, title: "Certified Jewelry", desc: "100% authentic & BIS hallmarked" },
        { icon: RefreshCw, title: "Easy Returns", desc: "7-day hassle-free return policy" },
        { icon: Truck, title: "Secure Shipping", desc: "Free & insured pan-India delivery" },
    ]

    return (
        <section className="py-24 bg-background min-h-screen">
            <div className="container max-w-7xl mx-auto px-6">
                <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-xs tracking-[0.15em] uppercase transition-all mb-10 group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Collections
                </Link>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Images Column */}
                    <div className="space-y-6">
                        <ProductGallery images={images} fallbackName={product.name} />
                        
                        <div className="hidden lg:grid grid-cols-3 gap-6 pt-4">
                            {trustElements.map((el, i) => (
                                <div key={i} className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-muted/30 border border-border/40">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <el.icon className="size-5" />
                                    </div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">{el.title}</h4>
                                    <p className="text-[9px] text-muted-foreground leading-tight">{el.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-primary text-[10px] tracking-[0.25em] uppercase font-bold">
                                        {product.category?.name || "Premium Collection"}
                                    </p>
                                    <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground leading-[1.1]" style={{ fontFamily: "var(--font-playfair)" }}>
                                        {product.name}
                                    </h1>
                                </div>

                                <div className="flex flex-wrap items-center gap-6">
                                    <span className="text-3xl font-bold text-foreground">
                                        {priceText}
                                    </span>
                                    <div className="h-6 w-px bg-border" />
                                    <Reviews rate={4.9} totalReviewers="12" />
                                </div>
                                
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                                    {product.description || "Indulge in the timeless elegance of this meticulously crafted piece. Designed to be a cherished addition to your jewelry collection."}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="flex-1 tracking-[0.2em] uppercase h-16 rounded-xl text-xs font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
                                >
                                    <a href={whatsappLink} target="_blank" rel="noreferrer">
                                        Enquire on WhatsApp
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Specifications Card */}
                        <div className="p-8 rounded-2xl bg-muted/20 border border-border/60">
                            <h2 className="mb-6 text-xs font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                                <div className="h-4 w-1 bg-primary rounded-full" />
                                Specifications
                            </h2>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                {productInfo.map((item, index) => (
                                    <div
                                        key={`product-detail-info-${index}`}
                                        className="space-y-1"
                                    >
                                        <dt className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            {item.label}
                                        </dt>
                                        <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-border/60">
                        <div className="flex items-end justify-between mb-12">
                            <div className="space-y-2">
                                <p className="text-primary text-[10px] tracking-[0.25em] uppercase font-bold">Recommendations</p>
                                <h2 className="text-3xl lg:text-4xl font-playfair font-bold" style={{ fontFamily: "var(--font-playfair)" }}>You May Also Like</h2>
                            </div>
                            <Link href="/collections" className="text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary">
                                View Entire Collection
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p: any) => (
                                <ProductCard key={p._id} product={p} currency={currencySym} whatsapp={whatsapp} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}



function Reviews({ rate, totalReviewers }: { rate: number; totalReviewers: string }) {
    const MAX_STARS = 5

    const renderStars = () => {
        const fullStars = Math.floor(rate)
        const hasHalfStar = rate % 1 >= 0.5
        const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0)

        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star
                    key={`product-detail-star-full-${i}`}
                    className="size-4 fill-[#D4AF37] text-[#D4AF37]"
                />
            )
        }

        if (hasHalfStar) {
            stars.push(
                <div key="product-detail-half-star" className="relative size-4">
                    <StarHalf className="absolute top-0 right-0 size-full fill-[#D4AF37] text-[#D4AF37]" />
                    <StarHalf className="absolute top-0 left-0 size-full -scale-x-100 fill-muted stroke-muted text-muted" />
                </div>
            )
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star
                    key={`product-detail-star-empty-${i}`}
                    className="size-4 fill-muted text-muted"
                />
            )
        }

        return stars
    }

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">{renderStars()}</div>
            {totalReviewers && (
                <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                    {totalReviewers} Reviews
                </p>
            )}
        </div>
    )
}
