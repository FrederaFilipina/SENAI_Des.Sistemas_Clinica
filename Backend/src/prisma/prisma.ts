import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = 'postgresql://postgres:sennha@localhost:5432/clinicFullstack?schema=public'
if (!connectionString) {
  throw new Error("DATABASE_URL não foi definida no arquivo .env");
}

const adapter = new PrismaPg({connectionString})
export const prisma = new PrismaClient({adapter, log:['query']})