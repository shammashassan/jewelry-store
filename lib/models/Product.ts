// lib/models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose"

export interface IProduct extends Document {
    name: string
    description: string
    price: number
    category: mongoose.Types.ObjectId
    stock: number
    images: string[]        // array of paths like /uploads/filename.jpg (max 4)
    featured: boolean
    visible: boolean
    material?: string
    createdAt: Date
    updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        material: { type: String, default: "Gold" },
        price: { type: Number, required: true, min: 0 },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        stock: { type: Number, default: 0, min: 0 },
        images: { type: [String], default: [], validate: [(v: string[]) => v.length <= 4, "Max 4 images"] },
        featured: { type: Boolean, default: false },
        visible: { type: Boolean, default: true },
    },
    { timestamps: true }
)

if (mongoose.models.Product) {
    delete mongoose.models.Product
}

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema)

export default Product