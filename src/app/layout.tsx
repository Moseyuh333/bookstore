import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Bookstore',
  description: 'Ứng dụng bán sách đơn giản',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <Header />
        <main className="p-6 pt-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
