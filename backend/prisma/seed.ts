import { hashSync } from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = hashSync('password', 10);
  const userPassword = hashSync('password', 10);

  await prisma.user.upsert({
    where: { email: 'admin@mail.com' },
    update: {
      name: 'Admin',
      username: 'admin',
      role: UserRole.ADMIN,
      passwordHash: adminPassword,
    },
    create: {
      id: uuidv4(),
      name: 'Admin',
      username: 'admin',
      email: 'admin@mail.com',
      role: UserRole.ADMIN,
      passwordHash: adminPassword,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@mail.com' },
    update: {
      name: 'User',
      username: 'user',
      role: UserRole.USER,
      passwordHash: userPassword,
    },
    create: {
      id: uuidv4(),
      name: 'User',
      username: 'user',
      email: 'user@mail.com',
      role: UserRole.USER,
      passwordHash: userPassword,
    },
  });
}

main()
  .catch((error) => {
    console.error('Failed to seed users:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
