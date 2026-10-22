"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldTitle,
} from "@/components/ui/field"
import { ImageUploader } from "./ImageUploader"
import { toast } from "sonner"

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.string().min(1, "Price is required"),
    category: z.string().min(1, "Category is required"),
    stock: z.string().min(1, "Stock is required"),
    images: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    visible: z.boolean().optional(),
    material: z.string().min(1, "Material is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

interface Props {
    initialData?: Partial<ProductFormValues> & { _id?: string }
    categories: { _id: string; name: string }[]
    onSuccess: () => void
    onCancel: () => void
}

export function ProductForm({ initialData, categories, onSuccess, onCancel }: Props) {
    const isEdit = !!initialData?._id

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            category: initialData?.category || "",
            stock: initialData?.stock || "0",
            images: initialData?.images || [],
            featured: initialData?.featured || false,
            visible: initialData?.visible !== false,
            material: initialData?.material || "GOLD",
        },
    })

    const { isSubmitting, errors } = form.formState

    const onSubmit = async (values: ProductFormValues) => {
        try {
            const url = isEdit ? `/api/products/${initialData!._id}` : "/api/products"
            const method = isEdit ? "PATCH" : "POST"
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    price: Number(values.price),
                    stock: Number(values.stock),
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            toast.success(isEdit ? "Product updated" : "Product created")
            onSuccess()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to save product")
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full min-h-0 w-full flex-col"
        >
            <SheetHeader className="flex-none border-b p-6 text-left">
                <SheetTitle className="text-2xl font-bold tracking-tight">
                    {isEdit ? "Edit Product" : "New Product"}
                </SheetTitle>
                <SheetDescription>
                    {isEdit ? "Update the details of your jewelry piece." : "Add a new exquisite piece to your collection."}
                </SheetDescription>
            </SheetHeader>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain w-full">
                <div className="p-6">
                    <FieldGroup>
                        {/* Name */}
                        <Field data-invalid={!!errors.name}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id="name"
                                        placeholder="e.g. Diamond Solitaire Ring"
                                        aria-invalid={!!errors.name}
                                    />
                                )}
                            />
                            <FieldError errors={[errors.name]} />
                        </Field>

                        {/* Category */}
                        <Field data-invalid={!!errors.category}>
                            <FieldLabel htmlFor="category">Category</FieldLabel>
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="category" aria-invalid={!!errors.category}>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FieldError errors={[errors.category]} />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Price */}
                            <Field data-invalid={!!errors.price}>
                                <FieldLabel htmlFor="price">Price (₹)</FieldLabel>
                                <Controller
                                    name="price"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="price"
                                            type="number"
                                            placeholder="0"
                                            aria-invalid={!!errors.price}
                                        />
                                    )}
                                />
                                <FieldError errors={[errors.price]} />
                            </Field>

                            {/* Stock */}
                            <Field data-invalid={!!errors.stock}>
                                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                                <Controller
                                    name="stock"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="stock"
                                            type="number"
                                            placeholder="0"
                                            aria-invalid={!!errors.stock}
                                        />
                                    )}
                                />
                                <FieldError errors={[errors.stock]} />
                            </Field>
                        </div>

                        {/* Material - Select */}
                        <Field data-invalid={!!errors.material}>
                            <FieldLabel htmlFor="material">Material</FieldLabel>
                            <Controller
                                name="material"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="material" aria-invalid={!!errors.material}>
                                            <SelectValue placeholder="Select material" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {["GOLD", "SILVER", "DIAMOND", "PLATINUM", "ROSE GOLD", "WHITE GOLD", "GEMSTONE"].map((mat) => (
                                                <SelectItem key={mat} value={mat}>
                                                    {mat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FieldError errors={[errors.material]} />
                        </Field>

                        {/* Description */}
                        <Field data-invalid={!!errors.description}>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        id="description"
                                        placeholder="Tell the story of this piece..."
                                        className="min-h-[120px]"
                                        aria-invalid={!!errors.description}
                                    />
                                )}
                            />
                            <FieldError errors={[errors.description]} />
                        </Field>

                        {/* Images */}
                        <Field data-invalid={!!errors.images}>
                            <FieldTitle>Images</FieldTitle>
                            <FieldDescription>Upload high-quality images of the product.</FieldDescription>
                            <Controller
                                name="images"
                                control={form.control}
                                render={({ field }) => (
                                    <ImageUploader
                                        value={field.value || []}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <FieldError errors={[errors.images]} />
                        </Field>

                        {/* Featured & Visible */}
                        <div className="flex flex-col gap-4 py-2">
                            <Field orientation="horizontal" className="justify-between">
                                <div className="space-y-0.5">
                                    <FieldLabel htmlFor="featured">Featured Product</FieldLabel>
                                    <FieldDescription>Show this piece in the featured collection.</FieldDescription>
                                </div>
                                <Controller
                                    name="featured"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Switch
                                            id="featured"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </Field>

                            <Field orientation="horizontal" className="justify-between">
                                <div className="space-y-0.5">
                                    <FieldLabel htmlFor="visible">Visible in Shop</FieldLabel>
                                    <FieldDescription>Control whether the product is public.</FieldDescription>
                                </div>
                                <Controller
                                    name="visible"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Switch
                                            id="visible"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </Field>
                        </div>
                    </FieldGroup>
                </div>
            </div>

            <SheetFooter className="flex-none border-t p-6">
                <div className="flex w-full gap-3">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        type="button"
                        className="flex-1"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : (isEdit ? "Update Product" : "Create Product")}
                    </Button>
                </div>
            </SheetFooter>
        </form>
    )
}