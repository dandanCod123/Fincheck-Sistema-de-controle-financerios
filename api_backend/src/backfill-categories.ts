import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_CATEGORIES = [
  { name: 'Salário', icon: 'salary', type: 'INCOME' },
  { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
  { name: 'Outro', icon: 'other', type: 'INCOME' },
  { name: 'Casa', icon: 'home', type: 'EXPENSE' },
  { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
  { name: 'Educação', icon: 'education', type: 'EXPENSE' },
  { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
  { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
  { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
  { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
  { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
  { name: 'Outro', icon: 'other', type: 'EXPENSE' },
];

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    for (const cat of DEFAULT_CATEGORIES) {
      const exists = await prisma.category.findFirst({
        where: { userId: user.id, name: cat.name, type: cat.type as any },
      });
      if (!exists) {
        await prisma.category.create({
          data: { ...cat, type: cat.type as any, userId: user.id },
        });
        console.log(`✅ ${user.email} → ${cat.name} (${cat.type})`);
      }
    }
  }

  console.log('Backfill concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
