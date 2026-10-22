"use client"
// app/(admin)/admin/login/page.tsx
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { signIn } from "@/lib/auth-client"
import { siteConfig } from "@/lib/data"

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signIn.email({ email, password })
            if (result.error) {
                toast.error(result.error.message ?? "Invalid credentials")
            } else {
                toast.success("Welcome back!")
                router.push("/admin")
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
            {/* Gold glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
            </div>

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />

            <div className="relative z-10 w-full max-w-sm">
                {/* Brand */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center size-14 rounded-xl bg-primary/10 border border-primary/20 mb-6 shadow-2xl shadow-primary/10">
                        <Gem className="size-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-foreground uppercase">
                        {siteConfig.name}
                    </h1>
                    <p className="text-muted-foreground/40 text-[10px] tracking-[0.4em] uppercase mt-2 font-medium">Admin Portal</p>
                </div>

                <Card className="bg-card/50 backdrop-blur-xl border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                    <CardHeader className="pb-8 pt-8 px-8">
                        <CardTitle className="text-xl font-bold tracking-tight">Sign In</CardTitle>
                        <CardDescription className="text-muted-foreground/60">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 font-semibold">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="admin@aurum.com"
                                    className="bg-background/50 border-border focus-visible:ring-primary h-12 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 font-semibold">
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="bg-background/50 border-border focus-visible:ring-primary h-12 rounded-xl pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 mt-2 rounded-xl font-bold tracking-wider uppercase text-xs shadow-lg shadow-primary/20"
                            >
                                {loading ? "Authenticating…" : "Sign In to Dashboard"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-muted-foreground/30 text-[10px] tracking-widest uppercase mt-8">
                    {siteConfig.name} &copy; {new Date().getFullYear()} &bull; Secure Access
                </p>
            </div>
        </div>
    )
}