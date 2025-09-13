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
  let books: Book[] = [];
  try {
    // Guard: if the table doesn't exist yet on fresh deploy
    books = await prisma.books.findMany();
  } catch (e) {
    // Swallow error and render marketing page
    books = [];
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Đặt món nhanh chóng cho cửa hàng của bạn
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Giao diện gọi món hiện đại, QR order, quản lý đơn hàng thời gian thực. Lấy cảm hứng từ trải nghiệm mượt mà như torder.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#demo" className="rounded-md bg-gray-900 px-6 py-3 text-white font-medium hover:bg-black">Dùng thử ngay</a>
            <a href="#features" className="rounded-md border border-gray-300 px-6 py-3 text-gray-900 font-medium hover:bg-gray-50">Tính năng</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              title: 'QR Order',
              desc: 'Khách quét QR tại bàn, gọi món tức thì, hạn chế sai sót.'
            }, {
              title: 'Realtime Dashboard',
              desc: 'Đơn hàng cập nhật trực tiếp, tối ưu thời gian chế biến.'
            }, {
              title: 'Tối ưu cho mobile',
              desc: 'Trải nghiệm mượt trên mọi thiết bị với giao diện tối giản.'
            }].map((f) => (
              <div key={f.title} className="rounded-lg bg-white p-6 shadow">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo data (optional) */}
      {books.length > 0 && (
        <section id="demo" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold mb-6">Danh sách sản phẩm mẫu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book: Book) => (
                <div key={book.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <img src={book.image} alt={book.title} className="w-32 h-40 object-cover mb-3 rounded" />
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-gray-600">${book.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Bookstore</span>
          <a className="hover:underline" href="mailto:contact@example.com">Liên hệ</a>
        </div>
      </footer>
    </div>
  );
}
