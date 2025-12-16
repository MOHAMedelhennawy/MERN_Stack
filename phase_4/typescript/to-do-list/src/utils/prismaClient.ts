import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client with proper configuration
export const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});