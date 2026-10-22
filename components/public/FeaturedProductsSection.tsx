import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel"
import { formatPrice } from "@/lib/utils"

interface Product {
    _id: string
    name: string
    price: number
    images: string[]
    category?: { name: string }
    description?: string // Added to match summary if available
}

interface Props {
    products: Product[]
    currency: string
    heading?: string
}

export function FeaturedProductsSection({ products, currency, heading = "Featured Pieces" }: Props) {
    if (products.length === 0) return null

    // Transform products to GalleryHoverCarousel items
    const carouselItems = products.map((product) => ({
        id: product._id,
        title: product.name,
        summary: product.description || `Exquisite ${product.category?.name || 'jewelry piece'} from our latest collection.`,
        url: `/products/${product._id}`,
        image: product.images[0] || "/placeholder-jewelry.jpg",
        price: formatPrice(product.price, currency),
    }))

    return (
        <GalleryHoverCarousel 
            heading={heading} 
            items={carouselItems} 
        />
    )
}
