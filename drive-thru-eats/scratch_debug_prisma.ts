import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  try {
    const staff = await prisma.staff.findMany();
    console.log("Staff fields:", Object.keys(staff[0] || {}));
    console.log("Prisma model keys:", Object.keys((prisma as any).staff || {}));
  } catch (e: any) {
    console.error("DEBUG_ERROR:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
