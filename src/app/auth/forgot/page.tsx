'use client';
import { useState } from 'react';

export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Quên mật khẩu</h1>
      <form className="space-y-3" onSubmit={async (e)=>{e.preventDefault(); setMsg('');
        const res = await fetch('/api/auth/forgot-password', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email})});
        const data = await res.json(); setMsg(res.ok? 'Nếu email tồn tại, chúng tôi đã gửi liên kết.' : (data.error||'Lỗi'));
      }}>
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="w-full rounded bg-gray-900 text-white py-2 hover:bg-black" type="submit">Gửi liên kết</button>
      </form>
      {msg && <div className="mt-4 text-sm">{msg}</div>}
    </div>
  );
}
