import "dotenv/config";
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");

    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Medicine Corner is running on ${PORT}`);
      });
    }
  } catch (error) {
    console.log("An error occurred during database connection", error);
    if (process.env.NODE_ENV !== "production") {
      await prisma.$disconnect();
      process.exit(1);
    }
  }
}

main();

export default app;
