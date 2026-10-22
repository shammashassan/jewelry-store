"use client"
// app/(admin)/admin/page.tsx
import { useEffect, useState } from "react"
import { Gem, Tag, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/data"
import { formatPrice as fp } from "@/lib/utils"

interface Stats {
    totalProducts: number
    featuredProducts: number
    totalCategories: number
    recentProducts: { _id: string; name: string; price: number; createdAt: string; category?: { name: string } }[]
}

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const [pRes, cRes] = await Promise.all([
                    fetch("/api/products?admin=true"),
                    fetch("/api/categories"),
                ])
                const { products } = await pRes.json()
                const { categories } = await cRes.json()
                setStats({
                    totalProducts: products.length,
                    featuredProducts: products.filter((p: { featured: boolean }) => p.featured).length,
                    totalCategories: categories.length,
                    recentProducts: products.slice(0, 5),
                })
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const statCards = [
        {
            label: "Total Products",
            value: stats?.totalProducts ?? 0,
            icon: Gem,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            label: "Featured Items",
            value: stats?.featuredProducts ?? 0,
            icon: Star,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            label: "Total Categories",
            value: stats?.totalCategories ?? 0,
            icon: Tag,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Site Visibility",
            value: "Public",
            icon: TrendingUp,
            color: "text-sky-500",
            bg: "bg-sky-500/10",
        },
    ]

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back. Here's what's happening in your store today.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((s) => (
                    <Card key={s.label} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                            <s.icon className={`h-4 w-4 ${s.color}`} />
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Skeleton className="h-8 w-20" />
                            ) : (
                                <>
                                    <div className="text-2xl font-bold">{s.value}</div>
                                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                                        Live Status
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Products */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : stats?.recentProducts.length === 0 ? (
                        <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                            No products yet. Add your first product!
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[300px]">Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Added On</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats?.recentProducts.map((p) => (
                                    <TableRow key={p._id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                                                    <Gem className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="truncate max-w-[200px]">{p.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal border-border">
                                                {p.category?.name ?? "Uncategorized"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-primary">
                                            {fp(p.price, siteConfig.currency)}
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {new Date(p.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}