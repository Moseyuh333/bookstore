'use client';

import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-gray-900">
          <span className="text-xl">📚</span>
          <span>Bookstore</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
              Sản phẩm
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {open && (
              <div className="absolute left-0 mt-2 w-48 rounded-md border bg-white shadow">
                <a className="block px-4 py-2 text-sm hover:bg-gray-50" href="#demo">Danh sách</a>
                <a className="block px-4 py-2 text-sm hover:bg-gray-50" href="#features">Tính năng</a>
              </div>
            )}
          </div>
          <a className="text-gray-700 hover:text-gray-900" href="#pricing">Giá</a>
          <a className="text-gray-700 hover:text-gray-900" href="#support">Hỗ trợ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a aria-label="Giỏ hàng" href="#cart" className="p-2 rounded hover:bg-gray-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </a>
          <a aria-label="Tài khoản" href="#account" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </a>
          <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setOpen((v)=>!v)} aria-label="Toggle Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
