const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function initPrograms() {
  await prisma.$connect();

  const createProduct = () => ({
    title: faker.commerce.productName(),
    description: faker.word.words({ count: { min: 5, max: 15 } }),
    price: faker.number.int({ min: 5000, max: 100000 }),
    discount: faker.number.int({ min: 1000, max: 4000 }),
    article: faker.string.alphanumeric(40),
  });

  await prisma.product.createMany({
    data: Array.from({ length: 50 }, createProduct),
  });
}

initPrograms()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
