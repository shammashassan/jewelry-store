"use client"
// app/(admin)/admin/settings/page.tsx
// Loads settings from DB via GET /api/settings, saves via PATCH /api/settings.

import { useState, useEffect, useCallback } from "react"
import { Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface SettingsForm {
    email: string; phone: string; address: string; instagram: string; facebook: string; whatsapp: string
}

const emptyForm: SettingsForm = {
    email: "", phone: "", address: "", instagram: "", facebook: "", whatsapp: "",
}

export default function AdminSettingsPage() {
    const [form, setForm] = useState<SettingsForm>(emptyForm)
    const [loading, setLoading] = useState(true)
    const [dirty, setDirty] = useState(false)
    const [saving, setSaving] = useState(false)

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/settings")
            const { settings } = await res.json()
            if (settings && Object.keys(settings).length > 0) {
                setForm({
                    ...emptyForm,
                    ...settings,
                })
            }
        } catch {
            toast.error("Failed to load settings")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { load() }, [load])

    const set = (key: keyof SettingsForm, value: unknown) => {
        setForm((f) => ({ ...f, [key]: value }))
        setDirty(true)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const payload = { ...form }
            const res = await fetch("/api/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error("Save failed")
            toast.success("Settings saved to database")
            setDirty(false)
        } catch {
            toast.error("Failed to save settings")
        } finally {
            setSaving(false)
        }
    }

    const handleReset = async () => {
        await load()
        setDirty(false)
        toast.success("Reloaded from database")
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col gap-4 pt-4">
                <Skeleton className="h-8 w-48 bg-white/5" />
                <Skeleton className="h-4 w-72 bg-white/5" />
                <Skeleton className="h-10 w-full bg-white/5 mt-4" />
                <Skeleton className="h-64 w-full bg-white/5" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your store contact information and social links.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset} className="h-9">
                        <RotateCcw className="size-3.5 mr-2" />
                        Reload
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={!dirty || saving} className="h-9">
                        <Save className="size-3.5 mr-2" />
                        {saving ? "Saving…" : "Save Changes"}
                    </Button>
                </div>
            </div>

            <Card className="border-border bg-card">
                <CardHeader className="border-b border-border pb-6">
                    <CardTitle className="text-xl font-bold">Store Identity</CardTitle>
                    <CardDescription>Brand contact details and social media presence</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Support Email</Label>
                                <Input 
                                    type="email" 
                                    value={form.email} 
                                    onChange={(e) => set("email", e.target.value)} 
                                    className="bg-background border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Contact Number</Label>
                                <Input 
                                    value={form.phone} 
                                    onChange={(e) => set("phone", e.target.value)} 
                                    className="bg-background border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Store Address</Label>
                                <Textarea 
                                    value={form.address} 
                                    onChange={(e) => set("address", e.target.value)} 
                                    className="bg-background border-border min-h-[100px] resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Instagram Profile URL</Label>
                                <Input 
                                    value={form.instagram} 
                                    onChange={(e) => set("instagram", e.target.value)} 
                                    className="bg-background border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">Facebook Page URL</Label>
                                <Input 
                                    value={form.facebook} 
                                    onChange={(e) => set("facebook", e.target.value)} 
                                    className="bg-background border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">WhatsApp Number</Label>
                                <Input 
                                    value={form.whatsapp} 
                                    onChange={(e) => set("whatsapp", e.target.value)} 
                                    className="bg-background border-border"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {dirty && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-background border border-primary/20 px-6 py-4 shadow-2xl z-50 rounded-full backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">You have unsaved changes</p>
                    <Separator orientation="vertical" className="h-6 bg-border" />
                    <Button size="sm" onClick={handleSave} disabled={saving} className="rounded-full shadow-lg shadow-primary/20">
                        {saving ? "Saving…" : "Save to Database"}
                    </Button>
                </div>
            )}
        </div>
    )
}