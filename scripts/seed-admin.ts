// scripts/seed-admin.ts
// Run once to create the admin account:
//   npx tsx scripts/seed-admin.ts
//
// Set these env vars first (or add to .env.local):
//   MONGODB_URI, BETTER_AUTH_SECRET, BETTER_AUTH_URL

import "dotenv/config"
import { auth } from "../lib/auth"

async function seedAdmin() {
    const email = process.env.SEED_ADMIN_EMAIL ?? "admin@aurum.com"
    const password = process.env.SEED_ADMIN_PASSWORD ?? "AurumAdmin@2025"
    const name = process.env.SEED_ADMIN_NAME ?? "AURUM Admin"

    console.log("🌱 Seeding admin account…")
    console.log("   Email:", email)

    try {
        // Use Better Auth's internal API to create a user directly
        const result = await auth.api.signUpEmail({
            body: { email, password, name },
        })

        if (result) {
            console.log("✅ Admin account created successfully!")
            console.log("   Email:", email)
            console.log("   Password:", password)
            console.log("\n⚠️  Change the password after first login.")
        }
    } catch (err: unknown) {
        if (err instanceof Error && err.message.includes("already exists")) {
            console.log("ℹ️  Admin account already exists. Skipping.")
        } else {
            console.error("❌ Failed to create admin:", err)
        }
    }

    process.exit(0)
}

seedAdmin()