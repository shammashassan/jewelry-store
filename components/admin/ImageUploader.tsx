"use client"
// components/admin/ImageUploader.tsx
import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Props {
    value: string[]
    onChange: (urls: string[]) => void
    maxImages?: number
}

export function ImageUploader({ value, onChange, maxImages = 4 }: Props) {
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return
        const remaining = maxImages - value.length
        if (remaining <= 0) {
            toast.error(`Max ${maxImages} images allowed`)
            return
        }

        const selected = Array.from(files).slice(0, remaining)
        setUploading(true)

        try {
            const formData = new FormData()
            selected.forEach((f) => formData.append("files", f))

            const res = await fetch("/api/upload", { method: "POST", body: formData })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error ?? "Upload failed")

            onChange([...value, ...data.urls])
            toast.success(`${data.urls.length} image(s) uploaded`)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Upload failed")
        } finally {
            setUploading(false)
            if (inputRef.current) inputRef.current.value = ""
        }
    }

    const remove = (idx: number) => {
        onChange(value.filter((_, i) => i !== idx))
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Existing images */}
            {value.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                    {value.map((url, i) => (
                        <div key={url} className="relative group aspect-square rounded-md overflow-hidden border border-border">
                            <Image
                                src={url}
                                alt={`Product image ${i + 1}`}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                sizes="100px"
                            />
                            {i === 0 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-[9px] text-center py-0.5 font-bold tracking-wider uppercase">
                                    Main
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => remove(i)}
                                className="absolute top-1 right-1 size-6 bg-background/80 hover:bg-destructive hover:text-destructive-foreground text-foreground flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload area */}
            {value.length < maxImages && (
                <div
                    className={cn(
                        "border-2 border-dashed border-border hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 py-10 bg-muted/30 rounded-lg group",
                        uploading && "opacity-60 pointer-events-none"
                    )}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault()
                        handleFiles(e.dataTransfer.files)
                    }}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="size-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-muted-foreground text-xs font-medium">Uploading…</p>
                        </div>
                    ) : (
                        <>
                            <div className="size-10 rounded-full bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-foreground text-xs font-semibold">
                                    Drop images or click to upload
                                </p>
                                <p className="text-muted-foreground text-[10px]">
                                    {value.length}/{maxImages} · JPG, PNG, WEBP · Max 5MB each
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </div>
    )
}