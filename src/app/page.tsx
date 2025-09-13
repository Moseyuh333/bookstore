import { PrismaClient } from '@prisma/client';

// Simple global prisma instance reuse (avoids exhausting DB connections in dev hot-reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Local type to satisfy TS if Prisma types aren't inferred (e.g., custom generation path)
interface Book {
  id: number;
  title: string;
  author?: string | null;
  price: number;
  stock: number;
  coverUrl: string;
  categoryId?: number | null;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  let books: Book[] = [];
  try {
    // Prefer the new Book model mapped to table "books"
    // Select columns by mapping to avoid runtime mismatch
    const rows = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        price: true,
        stock: true,
        coverUrl: true,
        categoryId: true,
      },
      orderBy: { id: 'asc' },
    });
    books = rows as Book[];
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
            Giao diện menu hiện đại, QR order, quản lý đơn hàng thời gian thực. Lấy cảm hứng từ trải nghiệm mượt mà như torder.
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

      {/* Showcase (with simple filter/search) */}
      <section id="demo" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Danh sách sách</h2>
              <p className="text-gray-600">Sản phẩm được lấy từ Postgres qua Prisma</p>
            </div>
            <form action="#demo" className="flex gap-2">
              <input name="q" placeholder="Tìm kiếm..." className="border rounded px-3 py-2 w-64" />
              <button className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-black" type="submit">Tìm</button>
            </form>
          </div>
          {books.length === 0 ? (
            <div className="text-gray-600">Chưa có dữ liệu. Hãy chạy seeding để xem demo.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((b) => (
                <div key={b.id} className="rounded-lg border p-4 flex flex-col">
                  <img src={b.coverUrl} alt={b.title} className="w-full h-40 object-cover rounded" />
                  <div className="mt-3">
                    <h3 className="font-semibold line-clamp-1">{b.title}</h3>
                    {b.author ? (
                      <p className="text-sm text-gray-600">{b.author}</p>
                    ) : null}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(b.price)}</span>
                    <span className="text-xs text-gray-500">Tồn: {b.stock}</span>
                  </div>
                  <button className="mt-4 rounded bg-gray-900 text-white py-2 hover:bg-black">Thêm vào giỏ</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
