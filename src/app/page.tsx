import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const books = await prisma.books.findMany(); // 'books' là model trong schema.prisma

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Danh sách sách</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-40 object-cover mb-3 rounded"
            />
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-gray-600">${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
