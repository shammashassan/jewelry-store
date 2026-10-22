"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { CobeGlobe } from "@/components/cobe-globe";
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Gem, 
  Truck 
} from "lucide-react";

const features = [
	{
		id: "artisan",
		children: <ArtisanVisual />,
		className: "md:col-span-2",
	},
	{
		id: "certification",
		children: <CertificationVisual />,
		className: "md:col-span-2",
	},
	{
		id: "sustainability",
		children: <SustainabilityVisual />,
		className: "sm:col-span-2 md:col-span-2",
	},
	{
		id: "collections",
		children: <CollectionsVisual />,
		className: "sm:col-span-2 md:col-span-3 p-0",
	},
	{
		id: "shipping",
		children: <ShippingVisual />,
		className: "sm:col-span-2 md:col-span-3 p-0",
	},
];

export function WhyChooseUs() {
	return (
		<section className="py-24 bg-muted/30 relative">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16 relative">
					<p
						className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold"
					>
						Our Promise
					</p>
					<h2
						className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6"
					>
						Why Our Maison
					</h2>
				</div>

				<div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
					{features.map((feature) => (
						<FeatureCard className={feature.className} key={feature.id}>
							{feature.children}
						</FeatureCard>
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-2xl border bg-background px-8 pt-8 pb-6",
				className
			)}
		>
			{children}
		</div>
	);
}

function FeatureTitle({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn("font-medium text-foreground text-lg", className)}
			{...props}
		/>
	);
}

function FeatureDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)} {...props} />
	);
}

function ArtisanVisual() {
	return (
		<>
			<div className="relative mx-auto flex size-32 items-center justify-center rounded-full border-4 border-dashed bg-background shadow-xs outline outline-border outline-offset-4">
				<div className="absolute inset-0 z-10 scale-120 bg-radial from-foreground/20 via-foreground/5 to-transparent blur-xl" />
				<Sparkles className="size-14 text-primary" />
			</div>

			<div className="relative mt-8 space-y-1.5 text-center">
				<FeatureTitle>Artisan Excellence</FeatureTitle>
				<FeatureDescription>
					Each piece is a masterpiece, handcrafted with precision by master artisans using time-honored techniques.
				</FeatureDescription>
			</div>
		</>
	);
}

function CertificationVisual() {
	return (
		<>
			<div className="relative mx-auto flex size-32 items-center justify-center rounded-full border bg-background shadow-xs outline outline-border outline-offset-4">
				<ShieldCheck className="size-20 text-primary" />
				<div className="absolute inset-0 scale-120 bg-radial from-foreground/15 via-foreground/5 to-transparent blur-xl" />
			</div>

			<div className="relative mt-8 space-y-1.5 text-center">
				<FeatureTitle>Certified Brilliance</FeatureTitle>
				<FeatureDescription>
					Every diamond and gemstone is ethically sourced and comes with globally recognized GIA or IGI certifications.
				</FeatureDescription>
			</div>
		</>
	);
}

function SustainabilityVisual() {
	return (
		<>
			<div className="relative mx-auto flex size-32 items-center justify-center rounded-full border bg-background shadow-xs outline outline-border outline-offset-4">
				<Leaf className="size-20 text-primary" />
				<div className="absolute inset-0 scale-120 bg-radial from-foreground/15 via-foreground/5 to-transparent blur-xl" />
			</div>

			<div className="relative mt-8 space-y-1.5 text-center">
				<FeatureTitle>Ethical Sourcing</FeatureTitle>
				<FeatureDescription>
					We are committed to conflict-free diamonds and recycled precious metals to ensure beauty with a conscience.
				</FeatureDescription>
			</div>
		</>
	);
}

function CollectionsVisual() {
	return (
		<div className="grid h-full sm:grid-cols-2">
			<div className="relative z-10 space-y-6 py-8 ps-8 pe-2">
				<div className="flex size-12 items-center justify-center rounded-full border bg-card shadow-xs outline outline-border/80 outline-offset-2">
					<Gem className="size-5 text-primary/80" />
				</div>
				<div className="space-y-2">
					<FeatureTitle className="text-base">
						Timeless Elegance
					</FeatureTitle>
					<FeatureDescription>
						Explore our signature collections, designed to be passed down through generations.
					</FeatureDescription>
				</div>
			</div>
			{/* Product Preview */}
			<div className="mask-b-from-90% mask-r-from-90% relative aspect-video sm:aspect-auto">
				<div className="absolute -right-1 -bottom-1 aspect-video max-h-50 rounded-tl-md border bg-card p-1 sm:max-h-42 md:aspect-square md:max-h-50 lg:aspect-16/12">
					<div className="aspect-video h-full overflow-hidden rounded-tl-sm border *:pointer-events-none *:size-full *:shrink-0 *:select-none">
						<img
							alt="Jewelry collection preview"
							className="object-cover w-full h-full"
							src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function ShippingVisual() {
	return (
		<div className="grid max-h-120 sm:grid-cols-2">
			<div className="space-y-6 pt-8 pb-4 pl-8 sm:pb-8">
				<div className="flex size-12 items-center justify-center rounded-full border bg-card shadow-xs outline outline-border/80 outline-offset-2">
					<Truck className="size-5 text-primary/80" />
				</div>
				<div className="space-y-2">
					<FeatureTitle className="text-base">
						Worldwide Insured Delivery
					</FeatureTitle>
					<FeatureDescription>
						Fully insured, white-glove delivery service ensures your purchase reaches you safely.
					</FeatureDescription>
				</div>
			</div>
			<div className="relative">
				<CobeGlobe className="-top-[12%] right-0 sm:absolute" />
			</div>
		</div>
	);
}
