import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password", 12);
  const user = await prisma.user.upsert({
    where: {
      email: "admin@admin.com",
    },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "admin",
      password,
    },
  });
  console.log(user);
}

main().then(async () => {
  return await prisma.$disconnect();
  process.exit();
});
