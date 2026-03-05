import { PrismaClient } from "@prisma/client"

// Log this to your terminal (not browser console) to verify Next.js sees it
console.log("NEXT_JS_RUNTIME_DATABASE_CHECK:", process.env.DATABASE_URL ? "DEFINED" : "UNDEFINED");

const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["query", "error", "warn"]
})
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma