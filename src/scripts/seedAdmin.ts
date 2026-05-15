import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
  override: true,
});

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.ADMIN_EMAIL,
      role: UserRole.ADMIN,
      password: process.env.ADMIN_PASSWORD,
    };

    if (!adminData.email || !adminData.password) {
      console.error(
        "❌ ERROR: ADMIN_EMAIL or ADMIN_PASSWORD is missing in your .env or .env.local file.",
      );
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      console.log("ℹ️ Admin already exists in the database. Skipping seed.");
      return;
    }

    console.log(`🚀 Seeding admin: ${adminData.email}...`);

    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:5000";
    const signUpUrl = `${baseUrl}/api/auth/sign-up/email`;

    const registerAdmin = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: process.env.APP_URL || "http://localhost:3000",
      },
      body: JSON.stringify(adminData),
    });

    if (registerAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("✅ --> Admin Successfully Created and Verified <--");
    } else {
      const errorData = await registerAdmin.json();
      console.error("❌ Failed to register admin via API:", errorData);
    }
  } catch (error) {
    console.error("❌ An unexpected error occurred during seeding:", error);
  } finally {
    // Disconnect Prisma after script completes
    await prisma.$disconnect();
  }
}

seedAdmin();
