// Prisma client singleton

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (prisma) {
    return prisma;
  }

  prisma = new PrismaClient();
  return prisma;
}

export async function closePrismaClient(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
}
