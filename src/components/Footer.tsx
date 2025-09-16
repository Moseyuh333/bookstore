export default function Footer() {
  return (
    <footer className="border-t bg-white" id="support">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-semibold mb-2">Về chúng tôi</div>
          <p className="text-gray-600">Giải pháp gọi món trực tuyến nhanh và linh hoạt cho cửa hàng.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Hỗ trợ</div>
          <ul className="space-y-1 text-gray-600">
            <li><a className="hover:underline" href="#faq">FAQ</a></li>
            <li><a className="hover:underline" href="#docs">Tài liệu</a></li>
            <li><a className="hover:underline" href="mailto:contact@example.com">Liên hệ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Kết nối</div>
          <div className="flex items-center gap-3 text-gray-600">
            <a aria-label="Facebook" href="#" className="hover:text-gray-900">Facebook</a>
            <a aria-label="Instagram" href="#" className="hover:text-gray-900">Instagram</a>
            <a aria-label="Twitter" href="#" className="hover:text-gray-900">Twitter</a>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Bookstore</div>
    </footer>
  );
}
