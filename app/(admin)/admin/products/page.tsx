"use client"
// app/(admin)/admin/products/page.tsx
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Gem, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ProductForm } from "@/components/admin/ProductForm"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"
import { siteConfig } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface Category { _id: string; name: string }
interface Product {
    _id: string
    name: string
    price: number
    stock: number
    images: string[]
    featured: boolean
    visible: boolean
    category: Category
    description: string
    material: string
    createdAt: string
}

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<Product | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const [pRes, cRes] = await Promise.all([
                fetch("/api/products?admin=true"),
                fetch("/api/categories"),
            ])
            const { products } = await pRes.json()
            const { categories } = await cRes.json()
            setProducts(products ?? [])
            setCategories(categories ?? [])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { load() }, [load])

    const openAdd = () => { setEditing(null); setSheetOpen(true) }
    const openEdit = (p: Product) => { setEditing(p); setSheetOpen(true) }

    const handleDelete = async () => {
        if (!deleteId) return
        const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" })
        if (res.ok) {
            toast.success("Product deleted")
            setProducts((p) => p.filter((x) => x._id !== deleteId))
        } else {
            toast.error("Delete failed")
        }
        setDeleteId(null)
    }

    const handleSuccess = () => {
        setSheetOpen(false)
        load()
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">{products.length} items in your catalogue</p>
                </div>
                <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="size-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Table Card */}
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Gem className="size-10 text-muted-foreground/20" />
                            <p className="text-muted-foreground text-sm">No products yet</p>
                            <Button onClick={openAdd} variant="outline" className="mt-1">
                                Add your first product
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id} className="group">
                                        <TableCell>
                                            <div className="size-12 rounded border border-border overflow-hidden relative bg-muted flex items-center justify-center">
                                                {product.images[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                        sizes="48px"
                                                    />
                                                ) : (
                                                    <Gem className="size-4 text-muted-foreground/30" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px]">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="font-semibold truncate">{product.name}</span>
                                                {product.featured && (
                                                    <Star className="size-3 text-primary fill-primary shrink-0" />
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
                                                <span>{product.material}</span>
                                                <span className="text-muted-foreground/30">•</span>
                                                <span>Stock: {product.stock}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal border-border bg-background">
                                                {product.category?.name ?? "No Category"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-primary">
                                            {formatPrice(product.price, siteConfig.currency)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                className={cn(
                                                    "text-[10px] tracking-wide uppercase px-2",
                                                    product.visible
                                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                                                        : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                                                )}
                                            >
                                                {product.visible ? "Visible" : "Hidden"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center gap-1 justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    onClick={() => openEdit(product)}
                                                    className="size-8 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    onClick={() => setDeleteId(product._id)}
                                                    className="size-8 text-muted-foreground hover:text-destructive"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Add / Edit Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="right">
                    <ProductForm
                        initialData={editing
                            ? {
                                _id: editing._id,
                                name: editing.name,
                                description: editing.description || "",
                                price: String(editing.price),
                                category: editing.category?._id || "",
                                stock: String(editing.stock),
                                images: editing.images || [],
                                featured: editing.featured || false,
                                visible: editing.visible !== false,
                                material: editing.material || "Gold",
                            }
                            : undefined
                        }
                        categories={categories}
                        onSuccess={handleSuccess}
                        onCancel={() => setSheetOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            {/* Delete confirm */}
            <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
                <AlertDialogContent className="border-border bg-background">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. The product will be permanently removed from your catalogue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-border">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete Product
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}