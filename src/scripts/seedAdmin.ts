import { string } from "better-auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      role: UserRole.ADMIN,
      password: process.env.ADMIN_PASSWORD,
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!!");
    }

    const registerAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin:"http://localhost:3000"
        },
        body: JSON.stringify(adminData),
      },
    );

    if(registerAdmin.ok){
        await prisma.user.update({
            where:{
                email:adminData.email
            },
            data:{
                emailVerified:true
            }
        })
    }

    console.log("--> Admin Successfully Created <--");

  } catch (error) {
    console.log(error);
  }
}

seedAdmin();
