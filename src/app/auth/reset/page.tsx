'use client';
import { useState } from 'react';

export default function ResetPage() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Đặt lại mật khẩu</h1>
      <form className="space-y-3" onSubmit={async (e)=>{e.preventDefault(); setMsg('');
        const res = await fetch('/api/auth/reset-password', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({token, password})});
        const data = await res.json(); setMsg(res.ok? 'Đã đặt lại mật khẩu' : (data.error||'Lỗi'));
      }}>
        <input className="w-full border rounded px-3 py-2" placeholder="Token" value={token} onChange={e=>setToken(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Mật khẩu mới" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded bg-gray-900 text-white py-2 hover:bg-black" type="submit">Đặt lại</button>
      </form>
      {msg && <div className="mt-4 text-sm">{msg}</div>}
    </div>
  );
}
