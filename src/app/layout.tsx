import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Bookstore',
  description: 'Ứng dụng bán sách đơn giản',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <header className="bg-gray-800 text-white px-6 py-4">
          <h1 className="text-xl font-bold">📚 Bookstore</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
