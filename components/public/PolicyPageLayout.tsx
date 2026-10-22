// components/public/PolicyPageLayout.tsx
import { PageHeader } from "./PageHeader"

interface Props {
    title: string
    lastUpdated: string
    children: React.ReactNode
}

export function PolicyPageLayout({ title, lastUpdated, children }: Props) {
    return (
        <main className="bg-background min-h-screen">
            <PageHeader 
                title={title}
                subtitle={`Last Updated: ${lastUpdated}`}
            />
            <div className="max-w-4xl mx-auto px-6 pb-24">

                <div className="prose prose-sm md:prose-base prose-slate dark:prose-invert max-w-none font-sans space-y-10 leading-relaxed text-muted-foreground">
                    {children}
                </div>
            </div>
        </main>
    )
}
