import { PrismaClient } from '@prisma/client';

// Simple global prisma instance reuse (avoids exhausting DB connections in dev hot-reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Local type to satisfy TS if Prisma types aren't inferred (e.g., custom generation path)
interface Book {
  id: number;
  title: string;
  price: number;
  image: string;
}
export const dynamic = "force-dynamic";
export default async function Home() {
  const books: Book[] = await prisma.books.findMany(); // Explicit type to prevent implicit any in map

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Danh sách sách</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {books.map((book: Book) => (
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
