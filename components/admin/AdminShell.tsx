"use client"
import * as React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { Separator } from "@/components/ui/separator"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppSidebar } from "./AppSidebar"

export function AdminShell({ children }: { children: React.ReactNode }) {
    const { data: session, isPending } = useSession()
    const router = useRouter()
    const pathname = usePathname()

    // Redirect if not authed
    useEffect(() => {
        if (!isPending && !session && pathname !== "/admin/login") {
            router.replace("/admin/login")
        }
    }, [session, isPending, pathname, router])

    // Login page renders without shell
    if (pathname === "/admin/login") return <>{children}</>

    if (isPending || !session) return null

    // Generate breadcrumbs from pathname
    const pathSegments = pathname.split("/").filter(Boolean)
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-background">
                {/* Header */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4 sticky top-0 bg-background/80 backdrop-blur-md z-30">
                    <div className="flex items-center gap-2 flex-1">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathSegments.slice(1).map((segment: string, idx: number) => {
                                    const path = `/${pathSegments.slice(0, idx + 2).join("/")}`
                                    const isLast = idx === pathSegments.length - 2
                                    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
                                    
                                    return (
                                        <React.Fragment key={path}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    
                    <div className="flex items-center gap-3 pr-2">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-xs font-medium text-foreground">{session.user?.name ?? "Admin"}</span>
                            <span className="text-[10px] text-muted-foreground">{session.user?.email}</span>
                        </div>
                        <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <span className="text-xs text-primary font-bold">
                                {session.user?.name?.[0] ?? "A"}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}