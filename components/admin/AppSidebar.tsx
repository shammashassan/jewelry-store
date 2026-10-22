"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutDashboard,
    Gem,
    Tag,
    Settings,
    LogOut,
    ExternalLink,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { signOut } from "@/lib/auth-client"
import { siteConfig } from "@/lib/data"
import { toast } from "sonner"

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Products", href: "/admin/products", icon: Gem },
    { label: "Categories", href: "/admin/categories", icon: Tag },
    { label: "Settings", href: "/admin/settings", icon: Settings },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const router = useRouter()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    const handleSignOut = async () => {
        await signOut()
        toast.success("Signed out")
        router.push("/admin/login")
    }

    return (
        <Sidebar collapsible="icon" className="border-r border-border" {...props}>
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent focus-visible:ring-0">
                            <div className="flex items-center gap-3">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                                    <Gem className="size-4" />
                                </div>
                                {!isCollapsed && (
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-bold tracking-widest text-primary uppercase">
                                            {siteConfig.name}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                                            Admin Panel
                                        </span>
                                    </div>
                                )}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <Separator className="bg-border/50" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
                        Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const active = item.exact 
                                    ? pathname === item.href 
                                    : pathname.startsWith(item.href)
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active}
                                            tooltip={item.label}
                                            className="px-4 py-5 hover:bg-accent/50"
                                        >
                                            <Link href={item.href} className="flex items-center gap-3">
                                                <item.icon data-icon="inline-start" />
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <Separator className="bg-border/50" />
            <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="View Site" className="text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:justify-center">
                            <Link href="/" target="_blank" className="flex items-center gap-3">
                                <ExternalLink data-icon="inline-start" />
                                <span className="group-data-[collapsible=icon]:hidden">View Site</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            onClick={handleSignOut} 
                            tooltip="Sign Out"
                            className="text-muted-foreground hover:text-destructive group-data-[collapsible=icon]:justify-center"
                        >
                            <LogOut data-icon="inline-start" />
                            <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
