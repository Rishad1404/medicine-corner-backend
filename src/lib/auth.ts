import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use true for port 465, false for port 587
//   auth: {
//     user: process.env.APP_USER,
//     pass: process.env.APP_PASSWORD,
//   },
// });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false,
    // requireEmailVerification: true,
  },
  //   emailVerification: {
  //     sendVerificationEmail: async ({ user, url, token }, request) => {
  //       const info = await transporter.sendMail({
  //         from: '"Medicine Corner" <medicinecorner@gmail.com>',
  //         to: "akbarali14041@gmail.com",
  //         subject: "Hello ✔",
  //         text: "Hello world?", // Plain-text version of the message
  //         html: "<b>Hello world?</b>", // HTML version of the message
  //       });

  //       console.log("Message sent:", info.messageId);
  //     }, 
  //   },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
