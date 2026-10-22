// lib/models/SiteSettings.ts
import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISiteSettings extends Document {
    // Store identity
    name: string
    tagline: string
    description: string
    email: string
    phone: string
    address: string
    instagram: string
    facebook: string
    whatsapp: string
    currency: string

    // Hero section
    heroBadge: string
    heroHeading: string
    heroSubheading: string
    heroCta: string
    heroCtaSecondary: string

    // About section
    aboutBadge: string
    aboutHeading: string
    aboutBody: string[] // array of paragraphs
    aboutStats: { value: string; label: string }[]
    aboutImage: string

    // Contact section
    contactHeading: string
    contactSubheading: string
    contactHours: { day: string; time: string }[]

    // Testimonials
    testimonials: {
        id: string
        name: string
        location: string
        rating: number
        text: string
        product: string
    }[]

    // Footer
    footerTagline: string

    updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
    {
        name: { type: String, default: "" },
        tagline: { type: String, default: "" },
        description: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        instagram: { type: String, default: "" },
        facebook: { type: String, default: "" },
        whatsapp: { type: String, default: "" },
        currency: { type: String, default: "₹" },

        heroBadge: { type: String, default: "" },
        heroHeading: { type: String, default: "" },
        heroSubheading: { type: String, default: "" },
        heroCta: { type: String, default: "" },
        heroCtaSecondary: { type: String, default: "" },

        aboutBadge: { type: String, default: "" },
        aboutHeading: { type: String, default: "" },
        aboutBody: { type: [String], default: [] },
        aboutStats: {
            type: [{ value: String, label: String }],
            default: [],
        },
        aboutImage: { type: String, default: "" },

        contactHeading: { type: String, default: "" },
        contactSubheading: { type: String, default: "" },
        contactHours: {
            type: [{ day: String, time: String }],
            default: [],
        },

        testimonials: {
            type: [
                {
                    id: String,
                    name: String,
                    location: String,
                    rating: { type: Number, default: 5 },
                    text: String,
                    product: String,
                },
            ],
            default: [],
        },

        footerTagline: { type: String, default: "" },
    },
    { timestamps: true }
)

const SiteSettings: Model<ISiteSettings> =
    mongoose.models.SiteSettings ??
    mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema)

export default SiteSettings