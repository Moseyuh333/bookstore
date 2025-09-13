import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.upsert({
    where: { name: "Kinh tế" },
    update: {},
    create: { name: "Kinh tế" },
  });
  await prisma.book.createMany({
    data: [
      {
        title: "Tư Duy Nhanh & Chậm",
        author: "Daniel Kahneman",
        price: 159000,
        stock: 20,
        categoryId: cat.id,
        coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=640&auto=format&fit=crop",
      },
      {
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: 98000,
        stock: 35,
        categoryId: cat.id,
        coverUrl: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?q=80&w=640&auto=format&fit=crop",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
