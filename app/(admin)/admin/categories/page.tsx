"use client"
// app/(admin)/admin/categories/page.tsx
import { useEffect, useState, useCallback } from "react"
import { Plus, Pencil, Trash2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { slugify } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface Category { _id: string; name: string; slug: string; order: number }

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editing, setEditing] = useState<Category | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [form, setForm] = useState({ name: "", slug: "", order: "0" })
    const [saving, setSaving] = useState(false)

    const load = useCallback(async () => {
        setLoading(true)
        const res = await fetch("/api/categories")
        const { categories } = await res.json()
        setCategories(categories ?? [])
        setLoading(false)
    }, [])

    useEffect(() => { load() }, [load])

    const openAdd = () => {
        setEditing(null)
        setForm({ name: "", slug: "", order: String(categories.length) })
        setDialogOpen(true)
    }

    const openEdit = (cat: Category) => {
        setEditing(cat)
        setForm({ name: cat.name, slug: cat.slug, order: String(cat.order) })
        setDialogOpen(true)
    }

    const handleNameChange = (name: string) => {
        setForm((f) => ({
            ...f,
            name,
            slug: editing ? f.slug : slugify(name),
        }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.slug) { toast.error("Name and slug required"); return }
        setSaving(true)
        try {
            const url = editing ? `/api/categories/${editing._id}` : "/api/categories"
            const method = editing ? "PATCH" : "POST"
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name, slug: form.slug, order: Number(form.order) }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success(editing ? "Category updated" : "Category created")
            setDialogOpen(false)
            load()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const res = await fetch(`/api/categories/${deleteId}`, { method: "DELETE" })
        if (res.ok) {
            toast.success("Category deleted")
            setCategories((c) => c.filter((x) => x._id !== deleteId))
        } else {
            toast.error("Delete failed")
        }
        setDeleteId(null)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">{categories.length} categories in total</p>
                </div>
                <Button onClick={openAdd}>
                    <Plus className="size-4 mr-2" />
                    Add Category
                </Button>
            </div>

            {/* List Card */}
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <Tag className="size-8 text-muted-foreground/20" />
                            <p className="text-muted-foreground text-sm">No categories yet</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Category</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead className="text-center">Order</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((cat) => (
                                    <TableRow key={cat._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <div className="size-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                    <Tag className="size-3.5 text-primary" />
                                                </div>
                                                <span className="font-semibold">{cat.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                {cat.slug}
                                            </code>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="font-mono text-[10px]">
                                                {cat.order}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center gap-1 justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    onClick={() => openEdit(cat)}
                                                    className="size-8 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    onClick={() => setDeleteId(cat._id)}
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

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md border-border bg-background p-0 overflow-hidden">
                    <DialogHeader className="px-6 pt-6 pb-4">
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {editing ? "Edit Category" : "New Category"}
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSave} className="space-y-6 px-6 pb-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Name *</Label>
                                <Input
                                    value={form.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    required
                                    placeholder="e.g. Bridal"
                                    className="bg-background border-border focus-visible:ring-primary"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Slug *</Label>
                                <Input
                                    value={form.slug}
                                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                                    required
                                    placeholder="e.g. bridal"
                                    className="bg-background border-border focus-visible:ring-primary font-mono"
                                />
                                <p className="text-muted-foreground/50 text-[10px]">Auto-generated from name, used in URLs</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Display Order</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={form.order}
                                    onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                                    className="bg-background border-border focus-visible:ring-primary w-24"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="flex-1"
                            >
                                {saving ? "Saving…" : editing ? "Update Category" : "Create Category"}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setDialogOpen(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete confirm */}
            <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
                <AlertDialogContent className="border-border bg-background">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Existing products linked to this category will lose their category reference. This action cannot be undone.
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
                            Delete Category
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}